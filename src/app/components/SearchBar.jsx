import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }) {
    return (
        <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search Pokémon..."
            className="mb-4 "
        />
    );
}
