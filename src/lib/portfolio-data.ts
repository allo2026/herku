import villa from "@/assets/hero-architecture.jpg";
import interior from "@/assets/portfolio-interior-1.jpg";
import tower from "@/assets/portfolio-tower.jpg";
import chair from "@/assets/portfolio-chair.jpg";
import masterplan from "@/assets/portfolio-masterplan.jpg";
import headphones from "@/assets/portfolio-headphones.jpg";
import kitchen from "@/assets/portfolio-kitchen.jpg";
import oceanVilla from "@/assets/portfolio-villa.jpg";
import packaging from "@/assets/portfolio-packaging.jpg";

export type Category = "Architecture" | "Real Estate" | "Products";

export type Work = {
  id: string;
  title: string;
  client: string;
  year: number;
  category: Category;
  image: string;
  span?: "tall" | "wide" | "square";
};

export const WORKS: Work[] = [
  { id: "clifftop", title: "Clifftop Residence", client: "Private Client", year: 2025, category: "Architecture", image: villa, span: "wide" },
  { id: "atelier", title: "Atelier Interior", client: "Studio North", year: 2025, category: "Architecture", image: interior, span: "tall" },
  { id: "meridian", title: "Meridian Tower", client: "Halden Group", year: 2024, category: "Real Estate", image: tower, span: "tall" },
  { id: "arc-chair", title: "Arc Lounge Chair", client: "Nord & Oak", year: 2025, category: "Products", image: chair, span: "square" },
  { id: "vellis", title: "Vellis Masterplan", client: "Coastline Dev.", year: 2024, category: "Real Estate", image: masterplan, span: "wide" },
  { id: "sonos", title: "Onyx Headphones", client: "Kova Audio", year: 2025, category: "Products", image: headphones, span: "tall" },
  { id: "sable-kitchen", title: "Sable Kitchen", client: "Verdant Homes", year: 2024, category: "Architecture", image: kitchen, span: "wide" },
  { id: "aria-villa", title: "Aria Ocean Villa", client: "Marren Estates", year: 2025, category: "Real Estate", image: oceanVilla, span: "square" },
  { id: "aurum", title: "Aurum Fragrance", client: "Maison Aurum", year: 2025, category: "Products", image: packaging, span: "tall" },
];
