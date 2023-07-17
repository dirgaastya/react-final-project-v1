import { Box, Image, Heading, Link } from "@chakra-ui/react";
// TODO: answer here

function Card({ card }) {
    return (
        <>
            <Link href={`/card/${card.id}`}>
                <Box className="yugioh-card" borderRadius="md" boxShadow="lg" p={5}>
                    <Image src={card.card_images[0].image_url} />
                    <Heading as={"h2"} fontSize={18}>
                        {card.name}
                    </Heading>
                </Box>
            </Link>
        </>
    ); // TODO: replace this
}

export default Card;
