import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const PokemonCard = ({ pokemon }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/pokemon/${pokemon.name}?id=${pokemon.id}`);
    };

    return (
        <Card
            className="cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:shadow-xl"
            onClick={handleClick}
        >
            <CardHeader>
                <CardTitle className="capitalize text-center text-xl">{pokemon.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <img
                    src={pokemon?.sprites?.front_default}
                    alt={pokemon.name}
                    className="w-44 h-44 object-contain"
                />
                <div className="flex gap-2 mt-2">
                    {pokemon.types.map((type) => (
                        <Badge key={type.type.name} className="capitalize">
                            {type.type.name}
                        </Badge>
                    ))}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {pokemon.stats.map((stat) => (
                        <div
                            key={stat.stat.name}
                            className="flex justify-between w-full bg-gray-100 p-1 rounded"
                        >
                            <span className="capitalize">{stat.stat.name}:</span>
                            <span className="font-semibold">{stat.base_stat}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PokemonCard;
