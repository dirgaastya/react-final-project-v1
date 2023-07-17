import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Heading, Button, Text, Link, Image, HStack, VStack, SimpleGrid } from "@chakra-ui/react";

function Detail() {
    const [cardDetail, setCardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getCardDetail = async () => {
        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
            const data = await response.json();
            setCardDetail(data.data[0]);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCardDetail();
    }, []);

    return (
        <Container maxW="container.xl" py={5}>
            <Link href="/">
                <Button>Back</Button>
            </Link>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Box py={5}>
                    <HStack align="start">
                        <Image width="248px" objectFit="cover" src={cardDetail.card_images[0].image_url} />
                        <Box height="100%">
                            <VStack align="start">
                                <Heading as="h2">{cardDetail.name}</Heading>
                                <Text fontWeight={"semibold"}>Level: {cardDetail.level}</Text>
                                <Text fontWeight={"semibold"}>{cardDetail.attribute}</Text>
                                <Text fontWeight={"semibold"}>
                                    ATK/{cardDetail.atk} DEF/{cardDetail.def}
                                </Text>
                                <Text>{`[ ${cardDetail.type} / ${cardDetail.race} ]`}</Text>
                                <Text>Description: {cardDetail.desc}</Text>
                            </VStack>
                        </Box>
                    </HStack>
                    <Box py={3}>
                        <Heading as="h4" textAlign="center" mb={3}>
                            Card Set
                        </Heading>
                        <SimpleGrid columns={4} gap={4}>
                            {cardDetail.card_sets.map((cardSet, index) => (
                                <Box key={`card-set-${index}`} p={3} boxShadow="md" borderRadius={5}>
                                    <Text>Name: {cardSet.set_name}</Text>
                                    <Text>Code: {cardSet.set_code}</Text>
                                    <Text>Rarity: {cardSet.set_rarity}</Text>
                                    <Text>Price: {cardSet.set_price}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            )}
        </Container>
    ); // TODO: replace this
}

export default Detail;
