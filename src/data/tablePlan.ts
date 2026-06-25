export type TablePlanEntry = {
  number: number
  guests: string[]
}

export function formatGuestName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return fullName.trim()

  const firstName = parts[0]
  const surnameInitial = parts.slice(1).join(' ').charAt(0).toLocaleUpperCase('pl-PL')

  return `${firstName} ${surnameInitial}.`
}

export function splitTableSides(guests: string[]): [string[], string[]] {
  const midpoint = Math.ceil(guests.length / 2)
  return [guests.slice(0, midpoint), guests.slice(midpoint)]
}

export const TABLE_PLAN: TablePlanEntry[] = [
  {
    number: 1,
    guests: [
      'Igor Zając',
      'Joanna Zając',
      'Kalina Kaźmierczak',
      'Iga Kaźmierczak',
      'Kinga Kaźmierczak',
      'Tomasz Kaźmierczak',
      'Jadwiga Lefik',
      'Zygmunt Lefik',
      'Stanisław Lefik',
      'Marzena Lefik',
      'Agnieszka Zakrzewska',
      'Marcin Zakrzewski',
      'Paulina Bobrowska',
      'Adam Kocz',
      'Dominika Zając',
      'Patryk Wenc',
      'Maja Dwornicka',
      'Maksymilian Dwornicki',
      'Małgorzata Kroczyńska',
      'Grzegorz Kroczyński',
      'Kinga Kroczyńska',
      'Arkadiusz Kroczyński',
      'Jan Lefik',
      'Barbara Lefik',
      'Jan Kocz',
      'Wiesława Kocz',
      'Kamila Tuchowska',
      'Adrian Tuchowski',
    ],
  },
  {
    number: 2,
    guests: [
      'Katarzyna Prządka',
      'Krzysztof Wiesiołek',
      'Janisław Mikołajczyk',
      'Małgorzata Mikołajczyk-Józwiak',
      'Marek Prządka',
      'Grażyna Prządka',
      'Jarosław Miszczak',
      'Magdalena Tomczyk',
      'Anna Zimna',
      'Joanna Zimna',
      'Bartłomiej Lefik',
      'Aneta Lefik',
      'Katarzyna Bednarek',
      'Błażej Bednarek',
      'Krzysztof Prządka',
      'Ewa Molga',
      'Witek Molga',
      'Maciej Prządka',
      'Patryk Prządka',
      'Patrycja Prządka',
      'Wojciech Fitych',
      'Natalia Nykiel',
      'Sebastian Nykiel',
      'Renata Nykiel',
      'Wioletta Brzezińska',
      'Jakub Lipiński',
      'Sandra Brzezińska',
      'Jacek Lefik',
      'Monika Lefik',
    ],
  },
  {
    number: 3,
    guests: [
      'Justyna Bebak-Szczucka',
      'Dominik Rogalski',
      'Karolina Maciejewska',
      'Julka Halusiak',
      'Dagmara Sypniewska',
      'Rafał Aleksandrowicz',
      'Ewelina Dziębor',
      'Robert Borkowski',
      'Olga Racińska',
      'Tomasz Chwalbiński',
      'Kinga Blachowska',
      'Jan Pietruszewski',
      'Daria Kowalska',
      'Łukasz Frątczak',
      'Mateusz Dela',
      'Julia Berecka',
      'Mateusz Kmieciak',
      'Maria Kmieciak',
      'Antoni Messyasz',
      'Joanna Messyasz',
      'Hubert Cywka',
      'Marta Masica',
      'Aleksandra Włodarczyk',
      'Olga Rodzik',
      'Karolina Woźnicka',
      'Tomasz Ogrodowski',
      'Piotr Ładoński',
      'Aurelia Wróblewska',
    ],
  },
]
