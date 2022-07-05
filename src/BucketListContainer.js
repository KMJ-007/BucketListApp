import { Text, Box, Image, Button } from "@chakra-ui/react";
import { FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";
const BucketListContainer = (props) => {
  const { data } = props;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Box background="#15181E" color="white">
      {data[0].Date ? (
        <Box
          p={3}
          m={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={2}
        >
          <Text>
            {new Date(data[0].Date).toLocaleDateString("en-US", options)}
          </Text>
          {data.map((data, i) => {
            return (
              <Box>
                <Box display="flex" key={i}>
                  <Image
                    src={data.image}
                    boxSize="100px"
                    objectFit="cover"
                    m={2}
                  />

                  <Text m={4}>{data.Content}</Text>
                </Box>
                <Box display="flex" direction="row">
                  <Button
                    m={2}
                    background="black"
                    onClick={() => {
                      window.location.href = `http://twitter.com/share?text=${data.Content}`;
                    }}
                  >
                    <FiTwitter color="#007E7E" />
                  </Button>
                  <Button
                    m={2}
                    background="black"
                    onClick={() => {
                      window.location.href = `https://www.linkedin.com/shareArticle?mini=true&title=${data.Content}`;
                    }}
                  >
                    <FiLinkedin color="#007E7E" />
                  </Button>
                  {/* <Button
                    m={2}
                    background="black"
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <FiInstagram color="#007E7E" />
                  </Button> */}
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
};

export default BucketListContainer;
