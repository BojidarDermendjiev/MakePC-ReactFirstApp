import style from "../../assets/styles/about.module.css";

export default function About() {
  return (
    <>
      <h1 className={style.title}>How to Build a Computer from Scratch</h1>
      <ol>
        <li>
          <h2 className={style.title}>Gather Your Components</h2>
          <p>You'll need the following components:</p>
          <ul>
            <li>CPU (Central Processing Unit)</li>
            <li>Motherboard</li>
            <li>RAM (Random Access Memory)</li>
            <li>Storage (HDD or SSD)</li>
            <li>Power Supply Unit (PSU)</li>
            <li>Graphics Card (if not integrated)</li>
            <li>Case</li>
            <li>Cooling System (CPU cooler and case fans)</li>
          </ul>
        </li>
        <li>
          <h2 className={style.title}>Prepare Your Workspace</h2>
          <p>
            Ensure you have a clean, static-free workspace. Use an anti-static
            wrist strap if possible.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the CPU</h2>
          <p>
            Carefully place the CPU into the motherboard socket, aligning the
            notches. Secure it with the retention arm.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the RAM</h2>
          <p>
            Insert the RAM sticks into the appropriate slots on the motherboard,
            ensuring they click into place.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Mount the Motherboard</h2>
          <p>
            Place the motherboard into the case and secure it with screws.
            Ensure all standoffs are in place.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the Power Supply</h2>
          <p>
            Mount the PSU in the case and connect the necessary power cables to
            the motherboard and components.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install Storage</h2>
          <p>
            Mount your HDD or SSD in the appropriate bays and connect them to
            the motherboard with SATA cables.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the Graphics Card</h2>
          <p>
            Insert the graphics card into the PCIe slot on the motherboard and
            secure it with screws.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Connect All Cables</h2>
          <p>
            Connect all necessary power and data cables to the motherboard and
            components.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the Cooling System</h2>
          <p>
            Install the CPU cooler and any additional case fans. Connect them to
            the appropriate headers on the motherboard.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Power On and Test</h2>
          <p>
            Connect your monitor, keyboard, and mouse. Power on the system and
            enter the BIOS to ensure all components are recognized.
          </p>
        </li>
        <li>
          <h2 className={style.title}>Install the Operating System</h2>
          <p>
            Insert your OS installation media and follow the on-screen
            instructions to install the operating system.
          </p>
        </li>
      </ol>
    </>
  );
}
