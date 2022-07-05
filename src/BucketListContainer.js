import { Text, Box, Image } from "@chakra-ui/react";
const BucketListContainer = (props) => {
  const { data } = props;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      {data[0].Date ? (
        <Box p={3} m={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Text>
            {new Date(data[0].Date).toLocaleDateString("en-US", options)}
          </Text>
          {data.map((data, i) => {
            return (
              <Box display="flex" key={i}>
                <Image
                  src={data.image}
                  boxSize="100px"
                  objectFit="cover"
                  m={2}
                />

                <Text m={4}>{data.Content}</Text>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </div>
  );
};

export default BucketListContainer;