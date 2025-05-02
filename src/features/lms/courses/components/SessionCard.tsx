import { 
    Box,
    Card,
    CardBody,
    Flex,
    Text,
    Badge,
    HStack,
    SimpleGrid,
    Heading,
    List,
    ListItem,
    Link,
    IconButton,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { MdPictureAsPdf, MdSlideshow, MdVideoLibrary, MdDescription } from "react-icons/md";
  import { DownloadIcon } from "@chakra-ui/icons";
  import StatusBadge from "@/components/atoms/StatusBadge";
  import { formatDate, formatTime } from "../utils/courseDetailUtils";
  
  interface Material {
    id: string;
    title: string;
    type: string;
    path: string;
  }
  
  interface SessionCardProps {
    session: {
      id: string;
      number: number;
      title: string;
      subTopic: string;
      startDate: string;
      endDate: string;
      deliveryMode: string;
      learningOutcome: string;
      status: string;
      materials: Material[];
    };
  }
  
  /**
   * SessionCard Component
   * Displays information about a course session
   */
  const SessionCard = ({ session }: SessionCardProps) => {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    
    
    return (
      <Card
        variant="outline"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        overflow="hidden"
        mb={4}
      >
        <Box 
          h="6px"
          bg={
            session.status === 'completed' ? 'green.500' :
            session.status === 'in-progress' ? 'orange.500' :
            'gray.300'
          }
        />
        <CardBody p={4}>
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 3, md: 6 }}>
            <Box minW="60px" textAlign={{ base: "left", md: "center" }}>
              <Text
                fontWeight="bold"
                fontSize="2xl"
                color={
                  session.status === 'completed' ? 'green.500' :
                  session.status === 'in-progress' ? 'orange.500' :
                  'gray.500'
                }
              >
                {session.number}
              </Text>
              <StatusBadge status={session.status} />
            </Box>
            
            <Box flex="1" overflow="hidden">
              <Heading size="sm" mb={1}>{session.title}</Heading>
              <Text fontSize="sm" color="gray.500" mb={2}>{session.subTopic}</Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mb={3}>
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Date:</Text>
                  <Text fontSize="sm">{formatDate(session.startDate)}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Time:</Text>
                  <Text fontSize="sm">
                    {formatTime(session.startDate)} - {formatTime(session.endDate)}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Delivery:</Text>
                  <Badge size="sm" colorScheme={session.deliveryMode === "F2F" ? "green" : "blue"}>
                    {session.deliveryMode}
                  </Badge>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Location:</Text>
                  <Text fontSize="sm">
                    {session.deliveryMode === "F2F" ? "Room 301" : "Zoom Meeting"}
                  </Text>
                </HStack>
              </SimpleGrid>
              
              <Box mb={4}>
                <Text fontWeight="bold" fontSize="sm" mb={1}>Learning Outcome:</Text>
                <Text fontSize="sm">{session.learningOutcome}</Text>
              </Box>
              
              {session.materials.length > 0 && (
                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={2}>Materials:</Text>
                  <List spacing={2}>
                    {session.materials.map((material) => (
                      <ListItem key={material.id}>
                        <Flex align="center">
                          {material.type === 'pdf' && <MdPictureAsPdf color="#4299E1" style={{marginRight: '8px'}} />}
                          {material.type === 'slides' && <MdSlideshow color="#4299E1" style={{marginRight: '8px'}} />}
                          {material.type === 'video' && <MdVideoLibrary color="#4299E1" style={{marginRight: '8px'}} />}
                          {!['pdf', 'slides', 'video'].includes(material.type) && 
                            <MdDescription color="#4299E1" style={{marginRight: '8px'}} />}
                          <Link href={material.path} color="brand.primary.600" mr={2}>
                            {material.title}
                          </Link>
                          <IconButton
                            aria-label="Download"
                            icon={<DownloadIcon />}
                            size="xs"
                            variant="ghost"
                          />
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
  
              {!session.materials.length && (
                <Text fontSize="sm" fontStyle="italic" color="gray.500">
                  No materials available for this session yet.
                </Text>
              )}
            </Box>
          </Flex>
        </CardBody>
      </Card>
    );
  };
  
  export default SessionCard;