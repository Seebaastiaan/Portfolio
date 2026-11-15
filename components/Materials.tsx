import { skills } from "@/lib/data";
import { Zone } from "./Zone";

/** The stack, set as the bill of materials every drawing carries. */
export default function Materials() {
  return (
    <Zone id="materials" letter="D" label="Materials">
      <div className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="anno flex flex-wrap items-center justify-between gap-x-8 gap-y-1">
          <h2 className="font-medium">Bill of materials</h2>
          <span className="text-ink-soft">
            Selected for type safety, iteration speed and long service life
          </span>
        </div>

        <table className="mt-10 w-full border-collapse text-left">
          <thead>
            <tr className="anno border-y border-line text-ink-soft">
              <th scope="col" className="w-16 py-3 font-normal">
                Item
              </th>
              <th scope="col" className="w-40 py-3 font-normal max-sm:hidden">
                Group
              </th>
              <th scope="col" className="py-3 font-normal">
                Specification
              </th>
              <th scope="col" className="w-12 py-3 text-right font-normal">
                Qty
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.map((group, i) => (
              <tr key={group.group} className="border-b border-line align-top">
                <td className="anno py-5 text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <th
                  scope="row"
                  className="anno py-5 font-medium max-sm:hidden"
                >
                  {group.group}
                </th>
                <td className="py-4 pr-4">
                  <p className="anno mb-1 font-medium sm:hidden">
                    {group.group}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[17px] leading-[1.45] sm:text-[19px]">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="anno py-5 text-right text-ink-soft">
                  {String(group.items.length).padStart(2, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Zone>
  );
}
