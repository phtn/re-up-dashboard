import type { Dispatch, ReactElement, SetStateAction } from "react";
import { onError, onSuccess, onWarn } from "@/app/ctx/toast";
import pkg from "../../package.json";

export const getVersion = () => {
  return pkg.version;
};

export const deg2Rad = (deg: number | string): number => {
  const getRad = (d: number) => (d * Math.PI) / 180;

  if (typeof deg === "string") {
    const parsed = parseInt(deg);
    return getRad(parsed);
  }

  return getRad(deg);
};

export const rawUriDecoder = <T>(params: T) => {
  return Object.entries(params as Record<string, string>).map(
    ([key, value]) => ({
      [key]: decodeRaw(encodeURIComponent(value ?? "")),
    }),
  );
};

const decodeRaw = (encoded: string) => {
  let val = encoded.replace(/%20/g, "__P__");
  val = decodeURIComponent(val);
  return val.replace(/__P__/g, "+");
};

export const passwordSecure = (name: string, secure: boolean) => {
  if (name === "email") return "email";
  if (name === "password" && secure) {
    return "password";
  }
  return "text";
};

export const removeLastEqualSign = (str: string) => {
  const regex = /=+$/;
  return str.replace(regex, "");
};

export const hashString = async (...args: string[]): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(args.join(""));

  return crypto.subtle.digest("SHA-256", data).then((hash) => {
    const encoded = btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(hash))),
    );
    const sanitizedHash = encoded
      .replace(/\+/g, "")
      .replace(/\//g, "")
      .replace(/=+$/, "");
    return removeLastEqualSign(sanitizedHash);
  });
};

export const createRefNo = async (
  ...args: Array<string | undefined>
): Promise<string> => {
  if (args.every((arg) => arg !== undefined)) {
    return `${await hashString(...args)}`;
  } else {
    return `${await hashString(new Date().getTime().toString(36))}`;
  }
};

export const formatMobile = (mobile_number: string) => {
  const regex = /^0|^(63)|\D/g;
  if (mobile_number) {
    const formattedNumber = mobile_number.replace(regex, "");
    return `+63${formattedNumber}`;
  }
  return "";
};

export const opts = (...args: (ReactElement | null)[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export function mapUnion<T extends string | number | symbol>() {
  return {
    // Record<[K in T], V> Record<keyof T, V>
    build: <V>(entries: Record<T, V>): Map<T, V> => {
      const map = new Map<T, V>();
      (Object.entries(entries) as [T, V][]).forEach(([key, value]) => {
        map.set(key, value);
      });
      return map;
    },
  };
}

export const decimal = (
  num: string | number | undefined,
  digits: number,
): string => {
  if (num === undefined) return "0.00";
  const parsedNumber = typeof num === "string" ? parseFloat(num) : num;
  return parsedNumber.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

export const prettyDate = (datestring: string | undefined): string => {
  if (!datestring) return "";
  const date = new Date(datestring);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
};

export const getToday = () => {
  const d = new Date();
  const datestring = d.toLocaleDateString();
  const date = prettyDate(datestring).split("at");
  return date[0];
};

export type CopyFnParams = {
  name: string;
  text: string;
  limit?: number;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success

export const charLimit = (
  text: string | undefined,
  chars?: number,
): string | undefined => {
  if (!text) return;
  return text.substring(0, chars ?? 35);
};

export const copyFn: CopyFn = async ({ name, text }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }
  if (!text) return false;

  return await navigator.clipboard
    .writeText(text)
    .then(() => {
      onSuccess(`${name ? "Copied: " + name : "Copied."}`);
      return true;
    })
    .catch((e) => {
      onError(`Copy failed. ${e}`);
      return false;
    });
};

export const getNextElement = <T>(
  array: T[],
  currentIndex: number,
  setState: Dispatch<SetStateAction<number>>,
) => {
  const nextIndex = (currentIndex + 1) % array.length; // Calculate the next index with wrap-around
  setState(nextIndex);
  return nextIndex;
};

export const getFileType = (file_type: string | undefined): string => {
  if (!file_type) {
    return "";
  }
  const re = /\/(\w+)$/;
  const match = re.exec(file_type);
  return match?.[1] ?? "";
};

export const getFileSize = (bytes: number | undefined): string => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  if (!bytes) {
    return "";
  }

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  const roundedValue = unitIndex > 1 ? bytes.toFixed(2) : Math.round(bytes);

  return `${roundedValue} ${units[unitIndex]}`;
};

export const withSpaces = (input: string): string => {
  return input.replace(/_/g, " ");
};

const adj: string[] = [
  "magnetic",
  "spinning",
  "perturbed",
  "excited",
  "coherent",
  "super",
  "observant",
  "wavelike",
  "dual",
  "tunneling",
  "computing",
  "collective",
  "orbital",
  "proto",
  "meta",
  "fast",
  "sonic",
  "blazing",
  "great",
  "quantum",
  "superposition",
  "entanglement",
  "wavefunction",
  "uncertainty principle",
  "state",
  "entanglement",
  "tunneling",
  "field",
  "planck",
  "schrodinger",
  "heisenberg",
  "superposition",
  "decoherence",
  "teleportation",
  "qubits",
  "interference",
  "feynman",
  "oscillator",
  "harmonic",
  "electrodynamics",
  "chromodynamics",
  "gravity",
  "optics",
  "computing",
  "cryptography",
  "bells",
  "many-worlds",
  "debroglie",
  "wavelength",
  "duality",
  "spin",
  "pauli",
  "bosons",
  "fermions",
  "vector",
  "observable",
  "matrix",
  "coherence",
  "phase",
  "noise",
  "annealing",
  "simulation",
  "network",
  "teleportation",
  "supremacy",
  "algorithms",
  "dynamics",
  "resonance",
  "fluctuations",
  "tunneling",
  "dots",
  "wells",
  "sensors",
  "metrology",
  "feedback",
  "tomography",
  "chaos",
  "thermodynamics",
  "information",
];

const moons: string[] = [
  "moon",
  "phobos",
  "deimos",
  "io",
  "europa",
  "ganymede",
  "callisto",
  "mimas",
  "enceladus",
  "tethys",
  "dione",
  "rhea",
  "titan",
  "hyperion",
  "iapetus",
  "miranda",
  "ariel",
  "umbriel",
  "titania",
  "oberon",
  "triton",
  "nereid",
  "charon",
  "styx",
  "nix",
  "kerberos",
  "hydra",
  "messier",
  "eradani",
  "attractor",
  "hyperspace",
];

export const neo = [
  "Euclid",
  "Archimedes",
  "Isaac Newton",
  "Carl Friedrich Gauss",
  "Bernhard Riemann",
  "Georg Cantor",
  "David Hilbert",
  "Henri Poincaré",
  "Emmy Noether",
  "Alan Turing",
  "John von Neumann",
  "Kurt Gödel",
  "Andrey Kolmogorov",
  "Paul Erdős",
  "Andrew Wiles",
  "Niels Henrik Abel",
  "Sofia Kovalevskaya",
  "John Nash",
  "Mary Cartwright",
  "David Hilbert",
  "G.H. Hardy",
  "Évariste Galois",
  "Nicolas Bourbaki",
  "John Horton Conway",
  "Andrew Gleason",
  "Michael Atiyah",
  "John Milnor",
  "Terence Tao",
  "Maryam Mirzakhani",
  "Manjul Bhargava",
  "Cédric Villani",
  "Grigori Perelman",
  "Jean-Pierre Serre",
  "Robert Langlands",
  "Carl Friedrich Gauss",
  "Leonhard Euler",
  "David Hilbert",
  "Ludwig Boltzmann",
  "Richard Feynman",
  "John von Neumann",
  "William Thurston",
  "Andrew Wiles",
  "Katherine Johnson",
  "Ada Lovelace",
  "Felix Klein",
  "David Mumford",
  "John H. Conway",
  "Alfred Tarski",
  "Hermann Weyl",
  "Norbert Wiener",
  "John von Neumann",
  "Benoit Mandelbrot",
  "John Horton Conway",
  "Srinivasa Ramanujan",
  "David Hilbert",
  "Emmy Noether",
  "Carl Friedrich Gauss",
  "Leonhard Euler",
  "Niels Henrik Abel",
  "Évariste Galois",
  "Georg Cantor",
  "Henri Poincaré",
  "John Nash",
  "Andrew Wiles",
  "Maryam Mirzakhani",
  "Isaac Newton",
  "Albert Einstein",
  "Niels Bohr",
  "Richard Feynman",
  "Galileo Galilei",
  "James Clerk Maxwell",
  "Marie Curie",
  "Max Planck",
  "Erwin Schrödinger",
  "Werner Heisenberg",
  "Stephen Hawking",
  "Paul Dirac",
  "Enrico Fermi",
  "J. Robert Oppenheimer",
  "David Bohm",
  "John von Neumann",
  "Roger Penrose",
  "Murray Gell-Mann",
  "Leonard Susskind",
  "Lisa Randall",
  "Brian Greene",
  "Niels Henrik Abel",
  "Hermann von Helmholtz",
  "Wolfgang Pauli",
  "Richard P. Feynman",
  "John Archibald Wheeler",
  "Katherine Johnson",
  "Chien-Shiung Wu",
  "Lise Meitner",
  "Fritz Haber",
  "Robert Hooke",
  "Hans Bethe",
  "Julian Schwinger",
  "David Gross",
  "Frank Wilczek",
  "Gerard Mourou",
  "Alain Aspect",
  "Kip Thorne",
  "John C. Mather",
  "Shuji Nakamura",
  "C. N. Yang",
  "Tsung-Dao Lee",
  "Steven Weinberg",
  "Edward Witten",
  "Nima Arkani-Hamed",
  "Juan Maldacena",
  "Satyendra Nath Bose",
  "Albert A. Michelson",
  "Max von Laue",
  "Robert Millikan",
  "Richard Feynman",
  "John Bardeen",
  "Walter Heitler",
  "David H. Frisch",
  "Robert F. Christy",
];

const domain = [
  "apple.com",
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "aol.com",
  "earthlink.com",
  "us.gov",
  "verizon.net",
  "att.net",
  "tmobile.net",
  "x.com",
  "tesla.com",
  "blackrock.com",
  "bitcoin.org",
  "re-up.ph",
];

const parfum = [
  "Chanel No. 5",
  "Dior Sauvage",
  "Gucci Bloom",
  "Marc Jacobs Daisy",
  "Yves Saint Laurent Black Opium",
  "Tom Ford Black Orchid",
  "Viktor & Rolf Flowerbomb",
  "Dolce & Gabbana Light Blue",
  "Creed Aventus",
  "Jo Malone London Peony & Blush Suede",
  "Burberry Her",
  "Lancome La Vie Est Belle",
  "Givenchy L'Interdit",
  "Versace Bright Crystal",
  "Calvin Klein CK One",
  "Thierry Mugler Angel",
  "Hermès Terre d'Hermès",
  "Acqua di Parma Colonia",
  "Maison Margiela Replica By the Fireplace",
  "Ralph Lauren Polo Blue",
  "Aerin Beauty Mediterranean Honeysuckle",
  "Chloe Eau de Parfum",
  "Narciso Rodriguez For Her",
  "Bvlgari Omnia Crystalline",
  "Issey Miyake L'Eau d'Issey",
  "Kenzo Flower by Kenzo",
  "Marc Jacobs Perfect",
  "Diptyque Philosykos",
  "Tom Ford Neroli Portofino",
  "Giorgio Armani Si",
  "Prada Candy",
  "Burberry Brit",
  "Salvatore Ferragamo Signorina",
  "Viktor & Rolf Spicebomb",
  "Jimmy Choo Eau de Parfum",
  "Elizabeth Arden Green Tea",
  "Coach Floral",
  "Montblanc Legend",
  "Escada Cherry in the Air",
  "Calvin Klein Euphoria",
  "Azzaro Chrome",
  "Lacoste Eau de Lacoste",
  "Fendi Fan di Fendi",
  "Givenchy Play",
  "Michael Kors Wonderlust",
  "Ralph Lauren Romance",
  "Hugo Boss Bottled",
  "Carolina Herrera Good Girl",
  "Burberry My Burberry",
  "Atelier Cologne Orange Sanguine",
];

export const nameGenerator = (): string => {
  const radj = Math.floor(Math.random() * adj.length);
  const noun = Math.floor(Math.random() * moons.length);

  return `${adj[radj]} ${moons[noun]}`;
};

export const parfumPicker = () =>
  parfum[Math.floor(Math.random() * parfum.length)];
export const moonPicker = () => moons[Math.floor(Math.random() * moons.length)];
export const unamePicker = () => adj[Math.floor(Math.random() * adj.length)];
export const namePicker = () => neo[Math.floor(Math.random() * neo.length)];
export const domainPicker = () =>
  domain[Math.floor(Math.random() * domain.length)];

export const generateRandomAmount = (): number => {
  // Ensure the min and max are within the specified range

  // Adjust min to the next number divisible by 5 if it's not already
  const adjustedMin = Math.ceil(55 / 5) * 5;
  // Adjust max to the previous number divisible by 5 if it's not already
  const adjustedMax = Math.floor(455 / 5) * 5;

  // Generate a random number in the adjusted range
  const randomNum =
    Math.floor(Math.random() * ((adjustedMax - adjustedMin) / 5 + 1)) * 5 +
    adjustedMin;

  return randomNum;
};

export const splitString = (str: string) => {
  const words = str.trim().split(" ");
  return [words.slice(0, words.length - 1).join(" "), words[words.length - 1]];
};

export const generateRandomPhoneNumbers = () => {
  // Generate random area code (XXX)
  const areaCode = Math.floor(100 + Math.random() * 900);
  // Generate random central office code (XXX)
  const centralOfficeCode = Math.floor(100 + Math.random() * 900);
  // Generate random line number (XXXX)
  const lineNumber = Math.floor(1000 + Math.random() * 9000);

  // Format the phone number
  const phoneNumber = `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;

  return phoneNumber;
};

export const photoPicker = () =>
  photo_urls[Math.floor(Math.random() * photo_urls.length)];

const photo_urls = [
  "https://avatars.githubusercontent.com/u/104030?v=4",
  "https://avatars.githubusercontent.com/u/8528975?v=4",
  "https://avatars.githubusercontent.com/u/4324516?v=4",
  "https://avatars.githubusercontent.com/u/3194333?v=4",
  "https://avatars.githubusercontent.com/u/2621?v=4",
  "https://avatars.githubusercontent.com/u/2688315?v=4",
  "https://avatars.githubusercontent.com/u/38349?v=4",
  "https://avatars.githubusercontent.com/u/6889504?v=4",
  "https://avatars.githubusercontent.com/u/14119929?v=4",
  "https://avatars.githubusercontent.com/u/67496?v=4",
  "https://avatars.githubusercontent.com/u/8446613?v=4",
  "https://avatars.githubusercontent.com/u/135652?v=4",
  "https://avatars.githubusercontent.com/u/1095328?v=4",
  "https://avatars.githubusercontent.com/u/9796621?v=4",
  "https://avatars.githubusercontent.com/u/1933999?v=4",
  "https://avatars.githubusercontent.com/u/4304764?v=4",
  "https://avatars.githubusercontent.com/u/1248668?v=4",
  "https://avatars.githubusercontent.com/u/539708?v=4",
  "https://avatars.githubusercontent.com/u/12280172?v=4",
  "https://avatars.githubusercontent.com/u/1225294?v=4",
  "https://avatars.githubusercontent.com/u/57144380?v=4",
  "https://avatars.githubusercontent.com/u/21203?v=4",
  "https://avatars.githubusercontent.com/u/9967170?v=4",
  "https://avatars.githubusercontent.com/u/1928999?v=4",
  "https://avatars.githubusercontent.com/u/7171?v=4",
  "https://avatars.githubusercontent.com/u/8565232?v=4",
  "https://avatars.githubusercontent.com/u/1293187?v=4",
  "https://avatars.githubusercontent.com/u/3576549?v=4",
  "https://avatars.githubusercontent.com/u/16470053?v=4",
  "https://avatars.githubusercontent.com/u/8142769?v=4",
];

const discountIds = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export const discountPicker = () =>
  discountIds[Math.floor(Math.random() * discountIds.length)];

export const getMonthAndYear = (
  timeInMs: number,
): { month: string; year: number } => {
  const date = new Date(timeInMs);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return { month, year };
};

export const authHandler =
  <T extends Error>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<T>>,
  ) =>
  (e: T) => {
    onError(
      e.message.includes("auth/invalid-credential")
        ? "Invalid Credentials"
        : e.message,
    );
    setLoading(false);
    if (setError) setError(e);
  };

export const okHandler =
  (setLoading: Dispatch<SetStateAction<boolean>>, message?: string) => () => {
    setLoading(false);
    onSuccess(`${message}`);
  };

export const settle = (setLoading: Dispatch<SetStateAction<boolean>>) => () => {
  setLoading(false);
};

export const warnHandler =
  <T extends Error>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<T>>,
  ) =>
  (e: T) => {
    onWarn(
      e.message.includes("auth/invalid-credential")
        ? "Invalid Credentials"
        : e.message,
    );
    setLoading(false);
    if (setError) setError(e);
  };

export const sanitizeText = (value: string) => {
  const spaces = value.replaceAll(" ", "_");
  const commas: string = spaces.replaceAll(",", "");
  return commas;
};

type FullnameParams = {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
};
export const createFullname = (params: FullnameParams) => {
  const { firstName, middleName, lastName } = params;
  if (!middleName) {
    return `${firstName} ${lastName}`;
  }
  return `${firstName} ${middleName} ${lastName}`;
};

export const getInitials = (name: string | undefined) => {
  if (!name) return;

  const words = name.split(" ");

  if (words.length === 1) {
    return name.slice(0, 2);
  }

  if (words.length === 2) {
    return words[0]!.charAt(0) + words[1]!.charAt(0);
  }

  if (words.length >= 3) {
    return words[0]!.charAt(0) + words[words.length - 1]!.charAt(0);
  }
};

export const basedOnTime = (): string => {
  const date = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: timezone }),
  );

  const hours = localDate.getHours();

  if (hours < 12) {
    return "Good day,";
  }

  if (hours >= 12 && hours < 17) {
    return "Good afternoon,";
  }

  if (hours >= 17 && hours < 20) {
    return "Good evening,";
  }

  return "Good evening,";
};

export const charlimit = (
  text: string | undefined,
  chars?: number,
): string | undefined => {
  if (!text) return;
  return text.substring(0, chars ?? 12);
};

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export function getPreviousMonths(): (MonthName | undefined)[] {
  const today: Date = new Date();
  let currentMonth: number = today.getMonth(); // Get current month (0-11)
  const previousMonths: number[] = [];

  // Calculate and push the current month
  previousMonths.push(currentMonth);

  // Calculate and push the previous three months
  for (let i = 1; i <= 3; i++) {
    currentMonth--;
    if (currentMonth < 0) {
      // Handle wrap-around to previous year
      currentMonth += 12;
      today.setFullYear(today.getFullYear() - 1); // Adjust the year
    }
    previousMonths.unshift(currentMonth);
  }

  // Convert month numbers to month names
  const monthNames: MonthName[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return previousMonths.map((month) => monthNames[month]);
}

const s = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const guid = () =>
  `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;

export const svgToPath = (svg: string) => {
  const p0 = svg.indexOf('d="');
  const p1 = svg.indexOf('"', p0 + 3);
  return svg.substring(p0 + 3, p1);
};

export const errHandler =
  <T>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<T>>,
  ) =>
  (e: T) => {
    onError("Panic!");
    setLoading(false);
    if (setError) setError(e);
  };

export const Err =
  <T extends Error | null | undefined>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    msg?: string,
  ) =>
  (e: T) => {
    onError(msg ?? `Error: ${e?.name}`);
    setLoading(false);
  };

export const Ok =
  (setLoading: Dispatch<SetStateAction<boolean>>, ...args: string[]) =>
  () => {
    setLoading(false);
    onSuccess(`${args[0]} ${args[1] ?? ""}`);
  };

export const onSettle =
  (setLoading: Dispatch<SetStateAction<boolean>>) => () => {
    setLoading(false);
  };

export const excludeProp = <T extends object>(o: T, ...keys: string[]) => {
  const ex = new Set(keys);
  return Object.fromEntries(Object.entries(o).filter(([k]) => !ex.has(k)));
};

export const pasteFn = async (id: string) => {
  const inputEl = document.getElementById(id) as HTMLInputElement;
  const text = await navigator.clipboard.readText();
  inputEl.value = text.trim();
  const v = inputEl.value;
  if (v.includes('"')) {
    v.replaceAll('"', "");
  }
  return v;
};

export const urlToFile = async (url: string | null, filename: string) => {
  if (!url) return;
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
};
