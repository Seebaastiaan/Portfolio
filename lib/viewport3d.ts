/**
 * The 3D viewport behind the model figures. Everything is drawn the way the
 * rest of the sheet is: paper-coloured solids with ink edges (hidden lines
 * removed), in an orthographic projection. Models are built from primitives
 * here — there are no asset files to load.
 *
 * This module pulls in three.js, so it is only ever imported dynamically.
 */
import {
  BoxGeometry,
  type BufferGeometry,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  Mesh,
  type Object3D,
  OctahedronGeometry,
  OrthographicCamera,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  Shape,
  SphereGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import type { ModelId } from "./data";

const PAPER = "#f3f3ee";
const INK = "#1b2b9b";
const ACCENT = "#e2412b";

type V3 = [number, number, number];

/** Materials and small builders shared by every model in one viewport. */
class Kit {
  readonly fill = new ShaderMaterial({
    uniforms: {
      paper: { value: new Color(PAPER) },
      ink: { value: new Color(INK) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    // Flat faces, tinted with a little ink as they turn away from the light.
    fragmentShader: /* glsl */ `
      uniform vec3 paper;
      uniform vec3 ink;
      varying vec3 vView;
      void main() {
        vec3 n = normalize(cross(dFdx(vView), dFdy(vView)));
        float lit = clamp(dot(n, normalize(vec3(-0.4, 0.8, 0.45))), 0.0, 1.0);
        gl_FragColor = vec4(mix(paper, ink, (1.0 - lit) * 0.2), 1.0);
        #include <colorspace_fragment>
      }
    `,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  readonly line = new LineMaterial({ color: INK, linewidth: 1.3 });
  readonly thin = new LineMaterial({
    color: INK,
    linewidth: 0.8,
    transparent: true,
    opacity: 0.55,
  });
  readonly dash = new LineMaterial({
    color: INK,
    linewidth: 1.3,
    dashed: true,
    dashSize: 0.11,
    gapSize: 0.08,
  });
  readonly accent = new LineMaterial({ color: ACCENT, linewidth: 1.5 });

  private readonly geometries: BufferGeometry[] = [];

  private track<T extends BufferGeometry>(geometry: T): T {
    this.geometries.push(geometry);
    return geometry;
  }

  /** A solid: paper faces plus an ink line on every edge sharper than `crease`°. */
  solid(geometry: BufferGeometry, crease = 25): Group {
    return this.template(geometry, crease)();
  }

  /**
   * A stamp for a part that repeats: every copy shares one set of buffers,
   * so eighty bars cost the GPU memory of one.
   */
  template(geometry: BufferGeometry, crease = 25): () => Group {
    const faces = this.track(geometry);
    const edges = new EdgesGeometry(geometry, crease);
    const lines = this.track(new LineSegmentsGeometry().fromEdgesGeometry(edges));
    edges.dispose();
    return () => {
      const group = new Group();
      group.add(new Mesh(faces, this.fill), new LineSegments2(lines, this.line));
      return group;
    };
  }

  box(w: number, h: number, d: number, at: V3): Group {
    const solid = this.solid(new BoxGeometry(w, h, d));
    solid.position.set(...at);
    return solid;
  }

  /** A continuous polyline; pass `closed` to join the last point to the first. */
  path(points: V3[], material: LineMaterial, closed = false): Line2 {
    const all = closed ? [...points, points[0]] : points;
    const geometry = this.track(new LineGeometry());
    geometry.setPositions(all.flat());
    const line = new Line2(geometry, material);
    if (material.dashed) line.computeLineDistances();
    return line;
  }

  /** Unconnected segments, given as consecutive point pairs. */
  segments(pairs: V3[], material: LineMaterial): LineSegments2 {
    const geometry = this.track(new LineSegmentsGeometry());
    geometry.setPositions(pairs.flat());
    return new LineSegments2(geometry, material);
  }

  dispose() {
    this.geometries.forEach((g) => g.dispose());
    [this.fill, this.line, this.thin, this.dash, this.accent].forEach((m) =>
      m.dispose(),
    );
  }
}

interface Model {
  root: Group;
  /** Point the camera orbits, and half the height of the view around it. */
  center: V3;
  view: number;
  yaw: number;
  /** Advance the model's own motion; `t` is seconds. */
  animate?: (t: number) => void;
}

/* ── Fig. — a pitch on its way to the strike zone ────────────────────── */

function buildPitch(kit: Kit): Model {
  const root = new Group();

  // Home plate, flat edge facing the mound.
  const plate = new Shape(
    [
      [-0.3, 0.3],
      [0.3, 0.3],
      [0.3, 0],
      [0, -0.3],
      [-0.3, 0],
    ].map(([x, y]) => new Vector2(x, y)),
  );
  const plateGeometry = new ExtrudeGeometry(plate, {
    depth: 0.04,
    bevelEnabled: false,
  });
  plateGeometry.rotateX(-Math.PI / 2);
  root.add(kit.solid(plateGeometry));

  // Strike zone and its nine cells.
  const [x0, x1, y0, y1] = [-0.3, 0.3, 0.55, 1.4];
  root.add(
    kit.path(
      [
        [x0, y0, 0],
        [x1, y0, 0],
        [x1, y1, 0],
        [x0, y1, 0],
      ],
      kit.line,
      true,
    ),
  );
  const cells: V3[] = [];
  for (const k of [1 / 3, 2 / 3]) {
    const x = x0 + (x1 - x0) * k;
    const y = y0 + (y1 - y0) * k;
    cells.push([x, y0, 0], [x, y1, 0], [x0, y, 0], [x1, y, 0]);
  }
  root.add(kit.segments(cells, kit.thin));

  // Mound and rubber.
  const moundZ = -4.3;
  const mound = kit.solid(new CylinderGeometry(0.7, 0.95, 0.12, 24), 40);
  mound.position.set(0, 0.06, moundZ);
  root.add(mound, kit.box(0.5, 0.04, 0.13, [0, 0.14, moundZ]));

  // The pitch: release point, late break, into the zone.
  const curve = new QuadraticBezierCurve3(
    new Vector3(0.4, 1.8, moundZ + 0.4),
    new Vector3(0.42, 1.95, -1.7),
    new Vector3(-0.1, 0.83, 0),
  );
  const samples = curve.getPoints(48);
  root.add(kit.path(samples.map((p) => [p.x, p.y, p.z]), kit.dash));
  // Its trace on the ground, with drop lines.
  root.add(kit.path(samples.map((p) => [p.x, 0.002, p.z]), kit.thin));
  const drops: V3[] = [];
  for (let i = 0; i <= 48; i += 8) {
    const p = samples[i];
    drops.push([p.x, p.y, p.z], [p.x, 0, p.z]);
  }
  root.add(kit.segments(drops, kit.thin));

  // The ball, with its seam.
  const radius = 0.15;
  const ball = kit.solid(new SphereGeometry(radius, 14, 9), 12);
  const seam: V3[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 2;
    const r = radius * 1.015;
    seam.push([
      r * (0.7 * Math.cos(t) + 0.3 * Math.cos(3 * t)),
      r * (0.7 * Math.sin(t) - 0.3 * Math.sin(3 * t)),
      r * 0.9165 * Math.sin(2 * t),
    ]);
  }
  ball.add(kit.path(seam, kit.accent));
  root.add(ball);

  const place = (k: number) => {
    ball.position.copy(curve.getPoint(k));
    ball.rotation.set(k * 9, k * 5, 0);
  };
  place(0.62);

  return {
    root,
    center: [0, 0.8, moundZ / 2],
    view: 1.9,
    yaw: -0.95,
    animate: (t) => {
      // 1.5 s of flight, then hold in the zone before the next pitch.
      const phase = (t % 3) / 1.5;
      place(Math.min(phase, 1));
    },
  };
}

/* ── Fig. — a railcar on its track ───────────────────────────────────── */

function buildRail(kit: Kit): Model {
  const root = new Group();
  const gauge = 0.36;
  const half = 2.3;

  const stampSleeper = kit.template(new BoxGeometry(0.14, 0.06, 1.02));
  for (let x = -half + 0.12; x <= half; x += 0.37) {
    const sleeper = stampSleeper();
    sleeper.position.set(x, 0.03, 0);
    root.add(sleeper);
  }
  for (const z of [-gauge, gauge]) {
    root.add(kit.box(half * 2, 0.07, 0.05, [0, 0.095, z]));
  }

  // Overhead wire and the two masts that carry it.
  const wireY = 1.86;
  root.add(
    kit.segments(
      [
        [-half, wireY, 0],
        [half, wireY, 0],
      ],
      kit.thin,
    ),
  );
  for (const x of [-half + 0.3, half - 0.3]) {
    root.add(kit.box(0.06, wireY + 0.1, 0.06, [x, (wireY + 0.1) / 2, -0.78]));
    root.add(
      kit.segments(
        [
          [x, wireY + 0.06, -0.78],
          [x, wireY + 0.06, 0.05],
        ],
        kit.line,
      ),
    );
  }

  const car = new Group();
  const wheels: Object3D[] = [];
  for (const x of [-0.6, 0.6]) {
    for (const z of [-gauge, gauge]) {
      const geometry = new CylinderGeometry(0.16, 0.16, 0.07, 14);
      geometry.rotateX(Math.PI / 2);
      const wheel = kit.solid(geometry, 40);
      wheel.position.set(x, 0.29, z);
      // A spoke, so the rotation reads.
      wheel.add(
        kit.segments(
          [
            [-0.12, 0, z > 0 ? 0.037 : -0.037],
            [0.12, 0, z > 0 ? 0.037 : -0.037],
          ],
          kit.thin,
        ),
      );
      wheels.push(wheel);
      car.add(wheel);
    }
  }
  car.add(kit.box(1.75, 0.1, 0.62, [0, 0.47, 0]));
  car.add(kit.box(2.0, 0.78, 0.8, [0, 0.91, 0]));
  car.add(kit.box(1.8, 0.07, 0.62, [0, 1.335, 0]));

  // Windows and doors, drawn on the body.
  const glass: V3[] = [];
  const rect = (a: V3, b: V3, c: V3, d: V3) => glass.push(a, b, b, c, c, d, d, a);
  for (const z of [-0.402, 0.402]) {
    for (const x of [-0.7, -0.24, 0.24, 0.7]) {
      rect(
        [x - 0.16, 0.86, z],
        [x + 0.16, 0.86, z],
        [x + 0.16, 1.18, z],
        [x - 0.16, 1.18, z],
      );
    }
  }
  for (const x of [-1.002, 1.002]) {
    rect([x, 0.86, -0.28], [x, 0.86, 0.28], [x, 1.18, 0.28], [x, 1.18, -0.28]);
  }
  car.add(kit.segments(glass, kit.thin));

  // Pantograph, up to the wire.
  const top = 1.37;
  car.add(
    kit.segments(
      [
        [-0.3, top, 0],
        [0.05, (top + wireY) / 2, 0],
        [0.05, (top + wireY) / 2, 0],
        [-0.15, wireY, 0],
        [-0.15, wireY, -0.2],
        [-0.15, wireY, 0.2],
      ],
      kit.line,
    ),
  );
  root.add(car);

  return {
    root,
    center: [0, 0.85, 0],
    view: 1.75,
    yaw: -0.6,
    animate: (t) => {
      const x = Math.sin(t * 0.55) * 1.0;
      car.position.x = x;
      wheels.forEach((w) => (w.rotation.z = -x / 0.16));
    },
  };
}

/* ── Fig. — a crate of produce, one item being inspected ─────────────── */

function buildCrate(kit: Kit): Model {
  const root = new Group();
  const [w, d, h] = [2.1, 1.35, 0.52];

  root.add(kit.box(w, 0.05, d, [0, 0.025, 0]));
  for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) {
    for (const z of [-d / 2 + 0.04, d / 2 - 0.04]) {
      root.add(kit.box(0.08, h, 0.08, [x, h / 2, z]));
    }
  }
  for (const y of [0.15, 0.4]) {
    for (const z of [-d / 2, d / 2]) root.add(kit.box(w, 0.15, 0.03, [0, y, z]));
    for (const x of [-w / 2, w / 2]) root.add(kit.box(0.03, 0.15, d, [x, y, 0]));
  }

  // Orange.
  const orange = kit.solid(new SphereGeometry(0.3, 14, 9), 12);
  orange.position.set(-0.6, 0.35, 0.18);
  root.add(orange);

  // Apple: a squashed sphere with a stem.
  const appleAt: V3 = [0.02, 0.33, -0.2];
  const appleGeometry = new SphereGeometry(0.29, 14, 9);
  appleGeometry.scale(1, 0.9, 1);
  const apple = kit.solid(appleGeometry, 12);
  apple.position.set(...appleAt);
  apple.add(
    kit.segments(
      [
        [0, 0.24, 0],
        [0.05, 0.38, 0],
      ],
      kit.line,
    ),
  );
  root.add(apple);

  // Banana.
  const spine = new CatmullRomCurve3(
    [
      [0.4, 0.2, 0.44],
      [0.66, 0.3, 0.3],
      [0.86, 0.46, 0.04],
      [0.84, 0.66, -0.3],
    ].map((p) => new Vector3(...p)),
  );
  root.add(kit.solid(new TubeGeometry(spine, 10, 0.105, 6), 20));

  // Detection frame around the apple: corner brackets, like a vision model's box.
  const s = 0.4;
  const arm = 0.14;
  const brackets: V3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const corner: V3 = [
          appleAt[0] + sx * s,
          appleAt[1] + 0.03 + sy * s * 0.92,
          appleAt[2] + sz * s,
        ];
        brackets.push(
          corner,
          [corner[0] - sx * arm, corner[1], corner[2]],
          corner,
          [corner[0], corner[1] - sy * arm, corner[2]],
          corner,
          [corner[0], corner[1], corner[2] - sz * arm],
        );
      }
    }
  }
  const frame = kit.segments(brackets, kit.accent);
  root.add(frame);

  return {
    root,
    center: [0, 0.32, 0],
    view: 1.15,
    yaw: -0.55,
    animate: (t) => {
      // The frame breathes slightly, as if re-detecting.
      const k = 1 + Math.sin(t * 2.2) * 0.035;
      frame.scale.setScalar(k);
      frame.position.set(
        appleAt[0] * (1 - k),
        (appleAt[1] + 0.03) * (1 - k),
        appleAt[2] * (1 - k),
      );
    },
  };
}

/* ── Fig. — a lucha libre ring ───────────────────────────────────────── */

function buildRing(kit: Kit): Model {
  const root = new Group();
  const size = 3;
  const deck = 0.5;
  const post = 1.32;

  root.add(kit.box(size, deck, size, [0, deck / 2, 0]));

  // Canvas border.
  const m = size / 2 - 0.16;
  root.add(
    kit.path(
      [
        [-m, deck + 0.002, -m],
        [m, deck + 0.002, -m],
        [m, deck + 0.002, m],
        [-m, deck + 0.002, m],
      ],
      kit.thin,
      true,
    ),
  );

  // Posts, ropes and turnbuckle pads.
  const heights = [0.42, 0.72, 1.02];
  const stampPost = kit.template(new CylinderGeometry(0.06, 0.06, 1.2, 8), 30);
  const stampPad = kit.template(new BoxGeometry(0.17, 0.13, 0.17));
  for (const x of [-post, post]) {
    for (const z of [-post, post]) {
      const column = stampPost();
      column.position.set(x, deck + 0.6, z);
      root.add(column);
      const inX = x - Math.sign(x) * 0.1;
      const inZ = z - Math.sign(z) * 0.1;
      for (const y of heights) {
        const pad = stampPad();
        pad.position.set(inX, deck + y, inZ);
        root.add(pad);
      }
    }
  }
  const r = post - 0.1;
  for (const y of heights) {
    root.add(
      kit.path(
        [
          [-r, deck + y, -r],
          [r, deck + y, -r],
          [r, deck + y, r],
          [-r, deck + y, r],
        ],
        kit.line,
        true,
      ),
    );
  }

  // Steps up to the apron.
  root.add(kit.box(0.7, deck / 3, 0.6, [0.6, deck / 6, size / 2 + 0.3]));
  root.add(kit.box(0.7, (deck * 2) / 3, 0.3, [0.6, deck / 3, size / 2 + 0.15]));

  // A luchador mask on the canvas.
  const y = deck + 0.004;
  const ellipse = (cx: number, cz: number, rx: number, rz: number, tilt = 0): V3[] =>
    Array.from({ length: 40 }, (_, i) => {
      const a = (i / 40) * Math.PI * 2;
      const [px, pz] = [Math.cos(a) * rx, Math.sin(a) * rz];
      return [
        cx + px * Math.cos(tilt) - pz * Math.sin(tilt),
        y,
        cz + px * Math.sin(tilt) + pz * Math.cos(tilt),
      ];
    });
  const mask = new Group();
  mask.add(kit.path(ellipse(0, 0, 0.62, 0.8), kit.accent, true));
  mask.add(kit.path(ellipse(-0.26, -0.14, 0.2, 0.11, 0.45), kit.accent, true));
  mask.add(kit.path(ellipse(0.26, -0.14, 0.2, 0.11, -0.45), kit.accent, true));
  mask.add(kit.path(ellipse(0, 0.42, 0.2, 0.09), kit.accent, true));
  mask.add(
    kit.path(
      [
        [0, y, -0.8],
        [-0.1, y, -0.48],
        [0, y, -0.3],
        [0.1, y, -0.48],
      ],
      kit.accent,
      true,
    ),
  );
  root.add(mask);

  return { root, center: [0, 0.85, 0.1], view: 1.95, yaw: -0.65 };
}

/* ── Fig. — levels to climb, one hop at a time ───────────────────────── */

function buildSteps(kit: Kit): Model {
  const root = new Group();
  const count = 11;
  const rise = 0.19;
  const first = 0.28;

  const base = kit.solid(new CylinderGeometry(1.5, 1.5, 0.06, 40), 40);
  base.position.y = 0.03;
  root.add(base);

  // A spiral stair around a central column: every tread is a level.
  const columnHeight = first + count * rise + 0.25;
  const column = kit.solid(
    new CylinderGeometry(0.13, 0.13, columnHeight, 12),
    40,
  );
  column.position.y = 0.06 + columnHeight / 2;
  root.add(column);

  const tops: Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const y = first + i * rise;
    const tread = kit.box(1.0, 0.08, 0.5, [
      Math.cos(angle) * 0.6,
      y,
      Math.sin(angle) * 0.6,
    ]);
    tread.rotation.y = -angle;
    root.add(tread);
    tops.push(
      new Vector3(Math.cos(angle) * 0.78, y + 0.04, Math.sin(angle) * 0.78),
    );
  }

  // The goal: a flag at the top of the column.
  const top = 0.06 + columnHeight;
  root.add(
    kit.segments(
      [
        [0, top, 0],
        [0, top + 0.6, 0],
      ],
      kit.line,
    ),
    kit.path(
      [
        [0, top + 0.6, 0],
        [0, top + 0.32, 0],
        [0.4, top + 0.46, 0],
      ],
      kit.accent,
      true,
    ),
  );

  // The learner: a token that hops up the levels, then starts again.
  const token = kit.solid(new OctahedronGeometry(0.14), 1);
  root.add(token);
  const hop = 0.5;
  const period = hop * (count - 1) + 1.4;
  const place = (t: number) => {
    const u = Math.min((((t % period) + period) % period) / hop, count - 1);
    const i = Math.min(Math.floor(u), count - 2);
    const f = Math.min(u - i, 1);
    token.position.lerpVectors(tops[i], tops[i + 1], f);
    token.position.y += 0.2 + Math.sin(f * Math.PI) * 0.32;
    token.rotation.y = t * 2.4;
  };
  place(hop * 4.45);

  return { root, center: [0, 1.3, 0], view: 1.75, yaw: 0.5, animate: place };
}

/* ── Fig. — a journal, with the week's mood rising off the page ──────── */

function buildJournal(kit: Kit): Model {
  const root = new Group();

  root.add(kit.box(2.95, 0.05, 2.02, [0, 0.025, 0]));

  // Two page blocks, lifting slightly towards the spine.
  const left = kit.box(1.4, 0.1, 1.9, [-0.71, 0.135, 0]);
  left.rotation.z = 0.05;
  const right = kit.box(1.4, 0.1, 1.9, [0.71, 0.135, 0]);
  right.rotation.z = -0.05;
  root.add(left, right);

  // Handwriting on the left page.
  const writing: V3[] = [];
  for (let i = 0; i < 8; i++) {
    const z = -0.72 + i * 0.17;
    writing.push([-0.52, 0.052, z], [i === 7 ? 0.05 : 0.52, 0.052, z]);
  }
  left.add(kit.segments(writing, kit.thin));

  // A pencil resting across it.
  const pencil = new Group();
  const barrel = new CylinderGeometry(0.035, 0.035, 0.9, 6);
  barrel.rotateZ(Math.PI / 2);
  const tip = new ConeGeometry(0.035, 0.13, 6);
  tip.rotateZ(-Math.PI / 2);
  tip.translate(0.515, 0, 0);
  pencil.add(kit.solid(barrel, 20), kit.solid(tip, 20));
  pencil.position.set(0.05, 0.088, 0.62);
  pencil.rotation.y = 0.5;
  left.add(pencil);

  // Seven days of mood, as bars growing out of the right page.
  const barGeometry = new BoxGeometry(0.12, 1, 0.12);
  barGeometry.translate(0, 0.5, 0);
  const stampBar = kit.template(barGeometry);
  const bars = Array.from({ length: 7 }, (_, i) => {
    const bar = stampBar();
    bar.position.set(-0.51 + i * 0.17, 0.05, 0.3);
    right.add(bar);
    return bar;
  });
  right.add(
    kit.segments(
      [
        [-0.62, 0.052, 0.42],
        [0.62, 0.052, 0.42],
      ],
      kit.thin,
    ),
  );
  const notes: V3[] = [];
  for (let i = 0; i < 3; i++) {
    notes.push([-0.52, 0.052, -0.72 + i * 0.17], [0.52, 0.052, -0.72 + i * 0.17]);
  }
  right.add(kit.segments(notes, kit.thin));

  // The companion's reply: a speech bubble over the entry.
  const [w, h, r] = [0.5, 0.27, 0.12];
  const outline: V3[] = [];
  const corner = (cx: number, cy: number, from: number) => {
    for (let k = 0; k <= 6; k++) {
      const a = from + (k / 6) * (Math.PI / 2);
      outline.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0]);
    }
  };
  corner(w - r, h - r, 0);
  corner(-w + r, h - r, Math.PI / 2);
  corner(-w + r, -h + r, Math.PI);
  outline.push([-0.2, -h, 0], [-0.32, -h - 0.2, 0], [-0.02, -h, 0]);
  corner(w - r, -h + r, -Math.PI / 2);
  const bubble = new Group();
  bubble.add(kit.path(outline, kit.accent, true));
  for (const x of [-0.2, 0, 0.2]) {
    bubble.add(
      kit.path(
        Array.from({ length: 12 }, (_, k): V3 => {
          const a = (k / 12) * Math.PI * 2;
          return [x + Math.cos(a) * 0.04, Math.sin(a) * 0.04, 0];
        }),
        kit.accent,
        true,
      ),
    );
  }
  bubble.rotation.y = 0.5;
  root.add(bubble);

  const animate = (t: number) => {
    bars.forEach((bar, i) => {
      bar.scale.y =
        0.42 + 0.24 * Math.sin(t * 0.9 + i * 0.95) + 0.1 * Math.sin(t * 0.5 + i * 2.1);
    });
    bubble.position.set(-0.72, 1.12 + Math.sin(t * 1.3) * 0.04, -0.2);
  };
  animate(0.6);

  return { root, center: [0, 0.6, 0], view: 1.55, yaw: -0.5, animate };
}

/* ── Fig. — a dense symmetric matrix collapsing to tridiagonal form ──── */

function buildMatrix(kit: Kit): Model {
  const root = new Group();
  const n = 9;
  const cell = 0.32;
  const span = n * cell;

  root.add(kit.box(span + 0.3, 0.06, span + 0.3, [0, 0.03, 0]));
  const grid: V3[] = [];
  for (let k = 0; k <= n; k++) {
    const p = -span / 2 + k * cell;
    grid.push([p, 0.062, -span / 2], [p, 0.062, span / 2]);
    grid.push([-span / 2, 0.062, p], [span / 2, 0.062, p]);
  }
  root.add(kit.segments(grid, kit.thin));

  // Deterministic entries, so A is the same symmetric matrix on every visit.
  const entry = (i: number, j: number) => {
    const [a, b] = [Math.min(i, j), Math.max(i, j)];
    const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  // One entry per bar: its height is the entry's magnitude.
  const barGeometry = new BoxGeometry(cell * 0.62, 1, cell * 0.62);
  barGeometry.translate(0, 0.5, 0);
  const stampBar = kit.template(barGeometry);
  const bars: { bar: Group; height: number; distance: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const distance = Math.abs(i - j);
      const height =
        distance <= 1 ? 0.55 + entry(i, j) * 0.6 : 0.18 + entry(i, j) * 0.7;
      const bar = stampBar();
      bar.position.set((j - (n - 1) / 2) * cell, 0.06, (i - (n - 1) / 2) * cell);
      root.add(bar);
      bars.push({ bar, height, distance });
    }
  }

  const smooth = (x: number) => {
    const c = Math.min(Math.max(x, 0), 1);
    return c * c * (3 - 2 * c);
  };
  // Dense → entries far from the diagonal vanish first → hold T → restore A.
  const animate = (t: number) => {
    const p = t % 9.5;
    for (const { bar, height, distance } of bars) {
      let keep = 1;
      if (distance > 1) {
        const start = 1.4 + ((n - 1 - distance) / (n - 3)) * 2.2;
        keep = p < 7.8 ? 1 - smooth((p - start) / 0.8) : smooth((p - 7.8) / 1.2);
      }
      bar.visible = keep > 0.015;
      bar.scale.y = Math.max(height * keep, 0.001);
    }
  };
  animate(3.1);

  return { root, center: [0, 0.4, 0], view: 1.7, yaw: -0.62, animate };
}

const builders: Record<ModelId, (kit: Kit) => Model> = {
  pitch: buildPitch,
  rail: buildRail,
  crate: buildCrate,
  ring: buildRing,
  steps: buildSteps,
  journal: buildJournal,
  matrix: buildMatrix,
};

export interface Viewport {
  yaw: number;
  elevation: number;
  resize(width: number, height: number): void;
  /** Draw one frame. `t` drives the model's own motion; omit to hold still. */
  render(t?: number): void;
  dispose(): void;
}

export function createViewport(canvas: HTMLCanvasElement, id: ModelId): Viewport {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const kit = new Kit();
  const model = builders[id](kit);

  const scene = new Scene();
  const tilt = new Group();
  const spin = new Group();
  model.root.position.set(-model.center[0], -model.center[1], -model.center[2]);
  spin.add(model.root);
  tilt.add(spin);
  scene.add(tilt);

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 0, 30);

  const viewport: Viewport = {
    yaw: model.yaw,
    elevation: 0.5,
    resize(width, height) {
      renderer.setSize(width, height, false);
      const aspect = width / height;
      // Keep the whole model in frame on narrow figures too.
      const halfH = Math.max(model.view, (model.view * 1.6) / aspect);
      camera.left = -halfH * aspect;
      camera.right = halfH * aspect;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    },
    render(t) {
      if (t !== undefined) model.animate?.(t);
      spin.rotation.y = viewport.yaw;
      tilt.rotation.x = viewport.elevation;
      renderer.render(scene, camera);
    },
    dispose() {
      kit.dispose();
      renderer.dispose();
      // Hand the context back now rather than waiting for garbage collection.
      renderer.forceContextLoss();
    },
  };
  return viewport;
}
