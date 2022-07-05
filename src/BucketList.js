import React from "react";
import BucketListContainer from "./BucketListContainer";

export default function BucketList(props) {
  const { content } = props;
  let dateArray = Object.keys(content);

  return (
    <div>
      {dateArray.map((data, i) => {
        console.log(data);
        if (data) {
          return <BucketListContainer data={content[data]} key={i} />;
        }
      })}
    </div>
  );
}
