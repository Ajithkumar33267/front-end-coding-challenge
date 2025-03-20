"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


const PokemonDetails = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchPokemon = async () => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await res.json();
                setPokemon(data);
            };

            fetchPokemon();
        }
    }, [id]);


    return (
        <div className="flex justify-center bg-slate-300 h-screen items-center p-6">
            <Button
                onClick={() => router.back()}
                className="absolute top-10 left-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 z-10"
            >
                ← Go Back
            </Button>
            {
                !pokemon ? (
                    <div className="container">
                        <Skeleton className="w-full h-full rounded-xl bg-gray-200" />
                        <Skeleton className="w-full h-full rounded-xl bg-gray-200" />
                        <Skeleton className="w-full h-full rounded-xl bg-gray-200" />

                    </div>
                ) : (
                    <Card className="container bg-white shadow-2xl">
                        <CardContent className="flex flex-col items-center p-6">
                            <Carousel className="md:w-full w-32 max-w-sm">
                                <CarouselContent>
                                    <CarouselItem>
                                        <img
                                            src={pokemon.sprites.front_default}
                                            alt={pokemon.name}
                                            className="w-full h-48 object-contain"
                                        />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img
                                            src={pokemon.sprites.back_default}
                                            alt={pokemon.name}
                                            className="w-full h-48 object-contain"
                                        />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img
                                            src={pokemon.sprites.front_shiny}
                                            alt={pokemon.name}
                                            className="w-full h-48 object-contain"
                                        />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img
                                            src={pokemon.sprites.back_shiny}
                                            alt={pokemon.name}
                                            className="w-full h-48 object-contain"
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <h2 className="text-2xl font-bold capitalize mt-4">{pokemon.name}</h2>

                            <div className="flex gap-2 mt-2">
                                {pokemon.types.map((type) => (
                                    <Badge key={type.type.name} className="capitalize">
                                        {type.type.name}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Abilities</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {pokemon.abilities.map((ability) => (
                                        <Badge key={ability.ability.name} variant="outline" className="capitalize">
                                            {ability.ability.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="flex justify-between bg-gray-100 p-2 rounded">
                                    <span>Height:</span>
                                    <span>{pokemon.height / 10} m</span>
                                </div>
                                <div className="flex justify-between bg-gray-100 p-2 rounded">
                                    <span>Weight:</span>
                                    <span>{pokemon.weight / 10} kg</span>
                                </div>
                            </div>

                            <div className="mt-4 w-full">
                                <h3 className="text-lg font-semibold">Stats</h3>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {pokemon.stats.map((stat) => (
                                        <div
                                            key={stat.stat.name}
                                            className="flex justify-between bg-gray-100 p-2 rounded"
                                        >
                                            <span className="capitalize">{stat.stat.name}:</span>
                                            <span className="font-semibold">{stat.base_stat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </CardContent>
                    </Card>

                )
            }

        </div>
    );
};

export default PokemonDetails;
