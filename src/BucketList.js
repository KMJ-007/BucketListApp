import React from "react";
import BucketListContainer from "./BucketListContainer";
import { Text, Box, Image } from "@chakra-ui/react";

export default function BucketList(props) {
  const { content } = props;
  let dateArray = Object.keys(content);

  return (
    <Box background="#15181E" color="white" mt={2}>
      {dateArray.map((data, i) => {
        console.log(data);
        if (data) {
          return <BucketListContainer data={content[data]} key={i} />;
        }
      })}
    </Box>
  );
}
