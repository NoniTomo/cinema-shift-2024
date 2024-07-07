import { AgeRating } from "../types/AgeRating";

export default function getAgeRating(ageRating: string): string {
  console.log(ageRating);
  switch (ageRating) {
    case 'G': return (AgeRating.G);
    case 'PG': return (AgeRating.PG);
    case 'PG13': return (AgeRating.PG13);
    case 'PG15': return (AgeRating.PG15);
    case 'R': return (AgeRating.R);
    case 'NC17': return (AgeRating.NC17);
    case 'NC21': return (AgeRating.NC21);
    default: return ('-');
  }
}
