import React, { useEffect, useState } from "react";
import getMasterDB from "./database/getMasterDB";
import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import BucketList from "./BucketList";

export default function Home() {
  const [masterDB, setMasterDB] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [reload, updateState] = useState();
  useEffect(() => {
    const getData = async () => {
      if (!masterDB) {
        let tempMasterDB = await getMasterDB();
        console.log("getting masterDB");
        setMasterDB(tempMasterDB);
      }
      if (masterDB) {
        console.log("got masterdb");
        await masterDB.allDocs().then(async (doc) => {
          console.log(doc);
          if (doc.total_rows == 0) {
            await masterDB
              .put({
                _id: "bucketList",
                data: [],
              })
              .then((data) => {
                console.log(data);
              });
          }
        });
        await masterDB.get("bucketList").then((doc) => {
          let contentData = doc.data;
          console.log(contentData);
          if (contentData) {
            function groupBy(arr, key) {
              return arr.reduce((acc, el) => {
                acc[el[key]] = [...(acc[el[key]] || []), el];
                return acc;
              }, []);
            }

            const result = groupBy(contentData, "Date");
            setContent(result);
          }
        });
      }
    };
    getData();
  }, [masterDB, reload]);

  const handleSubmit = async (values) => {
    await masterDB.get("bucketList").then(async (doc) => {
      let tempData = doc.data;
      tempData.push(values);
      console.log(tempData);
      doc.data = tempData;
      await masterDB.put(doc);
      setImage("");
      updateState({});
    });
  };
  return (
    <Box bg="#15181E" w="full" color="white">
      <Box
        display="flex"
        w="full"
        h="full"
        p={2}
        bg="#040506"
        color="white"
        justifyContent="space-around"
        direction="column"
      >
        <Text mx={7} fontSize="2xl">
          My Content Bucket List
        </Text>
        <Button onClick={onOpen} background="black">
          <AddIcon color="#007E7E" />
        </Button>
      </Box>
      <Box h="100vh" background="#15181E" color="white" mt={2}>
        {content ? (
          <BucketList content={content} />
        ) : (
          <Text fontSize="5xl" align="center">
            Add new list to View here
          </Text>
        )}
      </Box>
      {/* form */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent h="80vh" w="100vw">
          <ModalHeader bg="#040506" color="white">
            Add to Bucket list
          </ModalHeader>
          <ModalCloseButton color="#007E7E" />
          <ModalBody pb={6} background="#15181E" color="white">
            <Formik
              initialValues={{ Date: new Date(), Content: "", image: "" }}
              onSubmit={(values, actions) => {
                values.image = image;
                setTimeout(() => {
                  actions.setSubmitting(false);
                  handleSubmit(values);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="Date">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="Date">Date</FormLabel>
                        <Input {...field} id="Date" type="date" color="white" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="Content">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="Content">Content</FormLabel>
                        <Textarea {...field} />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {image ? (
                    <Image
                      m={2}
                      boxSize="100px"
                      objectFit="cover"
                      src={image}
                      alt="image"
                    />
                  ) : (
                    ""
                  )}

                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="image">image</FormLabel>
                        <Input
                          p={1}
                          {...field}
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const fileReader = new FileReader();
                            fileReader.onload = () => {
                              if (fileReader.readyState === 2) {
                                setImage(fileReader.result);
                              }
                            };
                            fileReader.readAsDataURL(e.target.files[0]);
                          }}
                        />

                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    isLoading={props.isSubmitting}
                    type="submit"
                    onClick={onClose}
                    color="#007E7E"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

// await masterDB
//   .put({
//     _id: "bcuketList",
//     data: [
//       {
//         date: new Date(),
//         content: "hello Karan",
//         image: "something",
//       },
//     ],
//   })
//   .then((data) => {
//     console.log(data);
//   });
