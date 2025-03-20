import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

export default function SortBy({ sortType, setSortType}) {
    return (
        <Select onValueChange={(value) => setSortType(value)} value={sortType}>
            <SelectTrigger>
                <ArrowDownUp size={12} className='m-2' />
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                    <SelectItem value="exp-asc">Base Experience (Low to High)</SelectItem>
                    <SelectItem value="exp-desc">Base Experience (High to Low)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}