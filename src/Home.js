import { SimpleGrid, Container, FormControl, Select } from "@chakra-ui/react";
import Cards from "./Cards";
import { useState, useEffect } from "react";

function Home() {
    const [cards, setCards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortCardFilter, setSortCardFilter] = useState("");

    const getYGODeck = async () => {
        try {
            const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4");
            const data = await response.json();
            setCards(data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getYGODeck();
    }, [sortCardFilter]);

    function sortData(type) {
        if (type === "Name") {
            return (a, b) => a.name.localeCompare(b.name);
        }
        if (type === "Attack") {
            return (a, b) => a.atk - b.atk;
        }
        if (type === "Defence") {
            return (a, b) => a.def - b.def;
        }
    }

    const handleChange = (event) => {
        setSortCardFilter(event.target.value);
    };

    return (
        <div>
            <Container maxW="6xl">
                <Select
                    name="sort"
                    value={sortCardFilter}
                    onChange={(event) => handleChange(event)}
                    placeholder={"SortBy"}
                    py={3}
                >
                    <option value="Name">Name</option>
                    <option value="Attack">Attack</option>
                    <option value="Defence">Defence</option>
                </Select>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <SimpleGrid spacing={4} columns={4}>
                        {cards.sort(sortData(sortCardFilter)).map((card, index) => (
                            <Cards key={`card-${index}`} card={card} />
                        ))}
                    </SimpleGrid>
                )}
            </Container>
        </div>
    ); // TODO: replace this
}

export default Home;
