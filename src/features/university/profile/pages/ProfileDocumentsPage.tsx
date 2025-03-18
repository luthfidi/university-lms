import { useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Badge,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Divider,
  useToast,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Switch,
  Tooltip,
  Progress,
  Icon,
} from "@chakra-ui/react";

import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
} from "@chakra-ui/icons";

import {
  MdPerson,
  MdSchool,
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAttachFile,
  MdCloudUpload,
  MdDescription,
  MdOutlineContactEmergency,
} from "react-icons/md";

import useAuthStore from "@/store/authStore";

// Mock data for student profile
const profileData = {
  personal: {
    id: "STD123456",
    name: "John Doe",
    birthDate: "2004-05-15",
    gender: "Male",
    religion: "Christian",
    nationality: "Indonesian",
    profilePhoto: "",
    bio: "Computer Science student passionate about web development and artificial intelligence.",
  },
  academic: {
    program: "Computer Science",
    faculty: "Faculty of Computer Science",
    entryYear: 2022,
    anticipatedGraduation: 2026,
    academicStatus: "Active",
    academicAdvisor: "Dr. Alan Parker",
    currentSemester: 4,
    studentEmail: "john.doe@university.com",
  },
  contact: {
    email: "johndoe@gmail.com",
    phone: "+62 812-3456-7890",
    alternativePhone: "+62 878-9012-3456",
    address: "Jl. Merdeka No. 123, Jakarta Selatan, 12345",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    postalCode: "12345",
  },
  emergency: {
    name: "Jane Doe",
    relationship: "Parent",
    phone: "+62 812-3456-7899",
    email: "jane.doe@example.com",
    address: "Jl. Merdeka No. 123, Jakarta Selatan, 12345",
  },
  bankInfo: {
    bankName: "Bank Central Asia",
    accountNumber: "1234567890",
    accountHolder: "John Doe",
    branch: "Jakarta Selatan",
  },
};

// Mock data for documents
const documentsData = [
  {
    id: "doc-1",
    name: "KTP (ID Card)",
    fileName: "ktp_john_doe.jpg",
    fileType: "image/jpeg",
    fileSize: "1.2 MB",
    uploadDate: "2022-08-10T10:15:30",
    status: "verified",
    expiryDate: null,
    category: "identity",
  },
  {
    id: "doc-2",
    name: "High School Diploma",
    fileName: "ijazah_sma_john_doe.pdf",
    fileType: "application/pdf",
    fileSize: "2.4 MB",
    uploadDate: "2022-08-10T11:30:45",
    status: "verified",
    expiryDate: null,
    category: "academic",
  },
  {
    id: "doc-3",
    name: "High School Transcript",
    fileName: "transkrip_sma_john_doe.pdf",
    fileType: "application/pdf",
    fileSize: "1.8 MB",
    uploadDate: "2022-08-10T11:35:20",
    status: "verified",
    expiryDate: null,
    category: "academic",
  },
  {
    id: "doc-4",
    name: "Family Card",
    fileName: "kk_john_doe.jpg",
    fileType: "image/jpeg",
    fileSize: "1.5 MB",
    uploadDate: "2022-08-12T09:20:15",
    status: "verified",
    expiryDate: null,
    category: "identity",
  },
  {
    id: "doc-5",
    name: "Health Insurance",
    fileName: "insurance_john_doe.pdf",
    fileType: "application/pdf",
    fileSize: "0.8 MB",
    uploadDate: "2022-09-05T14:10:25",
    status: "verified",
    expiryDate: "2023-09-05T00:00:00",
    category: "other",
  },
  {
    id: "doc-6",
    name: "COVID-19 Vaccine Certificate",
    fileName: "vaccine_john_doe.pdf",
    fileType: "application/pdf",
    fileSize: "0.5 MB",
    uploadDate: "2022-08-15T16:45:30",
    status: "verified",
    expiryDate: null,
    category: "health",
  },
];

// Mock data for document request history
const documentRequestHistory = [
  {
    id: "req-1",
    documentType: "Academic Transcript",
    requestDate: "2023-12-10T09:15:30",
    status: "completed",
    completionDate: "2023-12-12T14:20:45",
    purpose: "Internship Application",
    remarks: "Completed and sent to student email",
  },
  {
    id: "req-2",
    documentType: "Enrollment Verification Letter",
    requestDate: "2024-01-25T11:30:20",
    status: "processing",
    completionDate: null,
    purpose: "Visa Application",
    remarks: "Processing by Academic Office",
  },
  {
    id: "req-3",
    documentType: "GPA Certification",
    requestDate: "2023-11-05T10:20:15",
    status: "completed",
    completionDate: "2023-11-08T15:45:30",
    purpose: "Scholarship Application",
    remarks: "Completed and sent to student email",
  },
];

// Function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "verified":
      return "green";
    case "pending":
      return "yellow";
    case "rejected":
      return "red";
    case "expired":
      return "orange";
    case "processing":
      return "blue";
    case "completed":
      return "green";
    default:
      return "gray";
  }
};

// Function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ProfileDocumentsPage = () => {
  const { user } = useAuthStore();
  const toast = useToast();

  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);

  // State for document upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();

  const {
    isOpen: isRequestModalOpen,
    onOpen: onRequestModalOpen,
    onClose: onRequestModalClose,
  } = useDisclosure();

  // Style values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Handle file selection for document upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle profile edit form submission
  const handleProfileSubmit = () => {
    // In a real app, this would submit to an API
    toast({
      title: "Profile updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsEditingProfile(false);
  };

  // Handle document upload
  const handleDocumentUpload = () => {
    if (!selectedFile) return;

    // In a real app, this would upload to an API
    toast({
      title: "Document uploaded successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setSelectedFile(null);
    onUploadModalClose();
  };

  // Handle document request
  const handleDocumentRequest = () => {
    // In a real app, this would submit a request to an API
    toast({
      title: "Document request submitted successfully",
      description: "Your request will be processed within 3-5 working days",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onRequestModalClose();
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Profile & Documents
        </Heading>
        <Text color="gray.500">
          Manage your personal information and academic documents
        </Text>
      </Box>

      {/* Main Content */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Documents</Tab>
          <Tab>Document Requests</Tab>
        </TabList>

        <TabPanels>
          {/* Profile Tab */}
          <TabPanel px={0} pt={5}>
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              mb={6}
            >
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Personal Information</Heading>
                  <Button
                    leftIcon={isEditingProfile ? <CheckIcon /> : <EditIcon />}
                    colorScheme={isEditingProfile ? "green" : "blue"}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (isEditingProfile) {
                        handleProfileSubmit();
                      } else {
                        setIsEditingProfile(true);
                      }
                    }}
                  >
                    {isEditingProfile ? "Save" : "Edit"}
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box>
                    <Flex direction="column" align="center" mb={6}>
                      <Avatar
                        size="2xl"
                        name={profileData.personal.name}
                        src={profileData.personal.profilePhoto}
                        mb={4}
                      />
                      {isEditingProfile && (
                        <Button size="sm" leftIcon={<MdCloudUpload />}>
                          Change Photo
                        </Button>
                      )}
                    </Flex>
                    <VStack align="stretch" spacing={4}>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdPerson} />
                            <Text>Full Name</Text>
                          </HStack>
                        </FormLabel>
                        {isEditingProfile ? (
                          <Input
                            defaultValue={profileData.personal.name}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                personal: {
                                  ...editedProfile.personal,
                                  name: e.target.value,
                                },
                              })
                            }
                          />
                        ) : (
                          <Text>{profileData.personal.name}</Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdSchool} />
                            <Text>Student ID</Text>
                          </HStack>
                        </FormLabel>
                        <Text>{profileData.personal.id}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdPerson} />
                            <Text>Date of Birth</Text>
                          </HStack>
                        </FormLabel>
                        {isEditingProfile ? (
                          <Input
                            type="date"
                            defaultValue={profileData.personal.birthDate}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                personal: {
                                  ...editedProfile.personal,
                                  birthDate: e.target.value,
                                },
                              })
                            }
                          />
                        ) : (
                          <Text>
                            {new Date(
                              profileData.personal.birthDate
                            ).toLocaleDateString()}
                          </Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdPerson} />
                            <Text>Gender</Text>
                          </HStack>
                        </FormLabel>
                        {isEditingProfile ? (
                          <Select
                            defaultValue={profileData.personal.gender}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                personal: {
                                  ...editedProfile.personal,
                                  gender: e.target.value,
                                },
                              })
                            }
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Select>
                        ) : (
                          <Text>
                            {profileData.personal.gender === "Male"
                              ? "Male"
                              : "Female"}
                          </Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdPerson} />
                            <Text>Religion</Text>
                          </HStack>
                        </FormLabel>
                        {isEditingProfile ? (
                          <Select
                            defaultValue={profileData.personal.religion}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                personal: {
                                  ...editedProfile.personal,
                                  religion: e.target.value,
                                },
                              })
                            }
                          >
                            <option value="Islam">Islam</option>
                            <option value="Christian">Christian</option>
                            <option value="Catholic">Catholic</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Confucian">Confucian</option>
                          </Select>
                        ) : (
                          <Text>{profileData.personal.religion}</Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <HStack>
                            <Icon as={MdPerson} />
                            <Text>Nationality</Text>
                          </HStack>
                        </FormLabel>
                        {isEditingProfile ? (
                          <Input
                            defaultValue={profileData.personal.nationality}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                personal: {
                                  ...editedProfile.personal,
                                  nationality: e.target.value,
                                },
                              })
                            }
                          />
                        ) : (
                          <Text>{profileData.personal.nationality}</Text>
                        )}
                      </FormControl>
                    </VStack>
                  </Box>

                  <Box>
                    <Heading size="sm" mb={4}>
                      Academic Information
                    </Heading>
                    <VStack align="stretch" spacing={4}>
                      <FormControl>
                        <FormLabel>Study Program</FormLabel>
                        <Text>{profileData.academic.program}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Faculty</FormLabel>
                        <Text>{profileData.academic.faculty}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Entry Year</FormLabel>
                        <Text>{profileData.academic.entryYear}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Academic Status</FormLabel>
                        <Badge colorScheme="green">
                          {profileData.academic.academicStatus}
                        </Badge>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Academic Email</FormLabel>
                        <Text>{profileData.academic.studentEmail}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Academic Advisor</FormLabel>
                        <Text>{profileData.academic.academicAdvisor}</Text>
                      </FormControl>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card
                bg={cardBg}
                boxShadow="sm"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <CardHeader>
                  <Heading size="md">Contact Information</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdEmail} />
                          <Text>Personal Email</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.contact.email}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              contact: {
                                ...editedProfile.contact,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.contact.email}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdPhone} />
                          <Text>Alternative Phone Number</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.contact.alternativePhone}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              contact: {
                                ...editedProfile.contact,
                                alternativePhone: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.contact.alternativePhone}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdLocationOn} />
                          <Text>Address</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Textarea
                          defaultValue={profileData.contact.address}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              contact: {
                                ...editedProfile.contact,
                                address: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.contact.address}</Text>
                      )}
                    </FormControl>
                    {isEditingProfile && (
                      <>
                        <SimpleGrid columns={2} spacing={4}>
                          <FormControl>
                            <FormLabel>Province</FormLabel>
                            <Input
                              defaultValue={profileData.contact.province}
                              onChange={(e) =>
                                setEditedProfile({
                                  ...editedProfile,
                                  contact: {
                                    ...editedProfile.contact,
                                    province: e.target.value,
                                  },
                                })
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input
                              defaultValue={profileData.contact.city}
                              onChange={(e) =>
                                setEditedProfile({
                                  ...editedProfile,
                                  contact: {
                                    ...editedProfile.contact,
                                    city: e.target.value,
                                  },
                                })
                              }
                            />
                          </FormControl>
                        </SimpleGrid>
                        <FormControl>
                          <FormLabel>Postal Code</FormLabel>
                          <Input
                            defaultValue={profileData.contact.postalCode}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                contact: {
                                  ...editedProfile.contact,
                                  postalCode: e.target.value,
                                },
                              })
                            }
                          />
                        </FormControl>
                      </>
                    )}
                  </VStack>
                </CardBody>
              </Card>

              <Card
                bg={cardBg}
                boxShadow="sm"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <CardHeader>
                  <Heading size="md">Emergency Contact</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdOutlineContactEmergency} />
                          <Text>Name</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.emergency.name}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              emergency: {
                                ...editedProfile.emergency,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.emergency.name}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdPerson} />
                          <Text>Relationship</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Select
                          defaultValue={profileData.emergency.relationship}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              emergency: {
                                ...editedProfile.emergency,
                                relationship: e.target.value,
                              },
                            })
                          }
                        >
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Relative">Relative</option>
                          <option value="Guardian">Guardian</option>
                        </Select>
                      ) : (
                        <Text>{profileData.emergency.relationship}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdPhone} />
                          <Text>Phone Number</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.emergency.phone}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              emergency: {
                                ...editedProfile.emergency,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.emergency.phone}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdEmail} />
                          <Text>Email</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.emergency.email}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              emergency: {
                                ...editedProfile.emergency,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.emergency.email}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <HStack>
                          <Icon as={MdLocationOn} />
                          <Text>Address</Text>
                        </HStack>
                      </FormLabel>
                      {isEditingProfile ? (
                        <Textarea
                          defaultValue={profileData.emergency.address}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              emergency: {
                                ...editedProfile.emergency,
                                address: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.emergency.address}</Text>
                      )}
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Box mt={6}>
              <Card
                bg={cardBg}
                boxShadow="sm"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <CardHeader>
                  <Heading size="md">Bank Account Information</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Bank Name</FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.bankInfo.bankName}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              bankInfo: {
                                ...editedProfile.bankInfo,
                                bankName: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.bankInfo.bankName}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Account Number</FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.bankInfo.accountNumber}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              bankInfo: {
                                ...editedProfile.bankInfo,
                                accountNumber: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.bankInfo.accountNumber}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Account Holder Name</FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.bankInfo.accountHolder}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              bankInfo: {
                                ...editedProfile.bankInfo,
                                accountHolder: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.bankInfo.accountHolder}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Branch</FormLabel>
                      {isEditingProfile ? (
                        <Input
                          defaultValue={profileData.bankInfo.branch}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              bankInfo: {
                                ...editedProfile.bankInfo,
                                branch: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <Text>{profileData.bankInfo.branch}</Text>
                      )}
                    </FormControl>
                  </SimpleGrid>
                  {!isEditingProfile && (
                    <Text fontSize="sm" color="gray.500" mt={4}>
                      Bank account information is required for scholarship
                      payments or refunds.
                    </Text>
                  )}
                </CardBody>
              </Card>
            </Box>

            <Flex justify="center" mt={6}>
              {isEditingProfile && (
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="red"
                  variant="outline"
                  mr={4}
                  onClick={() => {
                    setIsEditingProfile(false);
                    setEditedProfile(profileData);
                  }}
                >
                  Cancel
                </Button>
              )}
              {isEditingProfile && (
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  onClick={handleProfileSubmit}
                >
                  Save Changes
                </Button>
              )}
            </Flex>
          </TabPanel>

          {/* Documents Tab */}
          <TabPanel px={0} pt={5}>
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              mb={6}
            >
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">My Documents</Heading>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={onUploadModalOpen}
                  >
                    Upload Document
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Document Name</Th>
                        <Th>File Type</Th>
                        <Th>Size</Th>
                        <Th>Upload Date</Th>
                        <Th>Status</Th>
                        <Th>Expiry</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {documentsData.map((document) => (
                        <Tr key={document.id}>
                          <Td fontWeight="medium">{document.name}</Td>
                          <Td>
                            <HStack>
                              <Icon
                                as={
                                  document.fileType.includes("pdf")
                                    ? MdDescription
                                    : document.fileType.includes("image")
                                      ? MdAttachFile
                                      : MdAttachFile
                                }
                                color={
                                  document.fileType.includes("pdf")
                                    ? "red.500"
                                    : document.fileType.includes("image")
                                      ? "blue.500"
                                      : "gray.500"
                                }
                              />
                              <Text>
                                {document.fileType.includes("pdf")
                                  ? "PDF"
                                  : document.fileType.includes("image")
                                    ? "Image"
                                    : document.fileType
                                        .split("/")[1]
                                        .toUpperCase()}
                              </Text>
                            </HStack>
                          </Td>
                          <Td>{document.fileSize}</Td>
                          <Td>{formatDate(document.uploadDate)}</Td>
                          <Td>
                            <Badge
                              colorScheme={getStatusColor(document.status)}
                            >
                              {document.status === "verified"
                                ? "Verified"
                                : document.status === "pending"
                                  ? "Pending Verification"
                                  : document.status === "rejected"
                                    ? "Rejected"
                                    : document.status === "expired"
                                      ? "Expired"
                                      : document.status}
                            </Badge>
                          </Td>
                          <Td>{formatDate(document.expiryDate)}</Td>
                          <Td>
                            <HStack spacing={2}>
                              <Tooltip label="Download">
                                <IconButton
                                  aria-label="Download"
                                  icon={<DownloadIcon />}
                                  size="sm"
                                  colorScheme="blue"
                                  variant="ghost"
                                />
                              </Tooltip>
                              <Tooltip label="Delete">
                                <IconButton
                                  aria-label="Delete"
                                  icon={<DeleteIcon />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                />
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </CardBody>
            </Card>

            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader>
                <Heading size="md">Required Documents</Heading>
              </CardHeader>
              <CardBody>
                <Flex wrap="wrap" gap={4}>
                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    align="center"
                    spacing={3}
                    width={{ base: "100%", md: "48%" }}
                    position="relative"
                  >
                    <Box position="absolute" top={2} right={2}>
                      <Badge colorScheme="green">Complete</Badge>
                    </Box>
                    <Icon as={MdDescription} boxSize={12} color="blue.500" />
                    <Heading size="sm">Identity Documents</Heading>
                    <Box textAlign="center">
                      <Text fontSize="sm">
                        ID Card, Family Card, and other identity documents
                      </Text>
                      <Progress
                        value={100}
                        size="sm"
                        colorScheme="green"
                        mt={2}
                      />
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    align="center"
                    spacing={3}
                    width={{ base: "100%", md: "48%" }}
                    position="relative"
                  >
                    <Box position="absolute" top={2} right={2}>
                      <Badge colorScheme="green">Complete</Badge>
                    </Box>
                    <Icon as={MdDescription} boxSize={12} color="purple.500" />
                    <Heading size="sm">Academic Documents</Heading>
                    <Box textAlign="center">
                      <Text fontSize="sm">
                        Diploma, Transcripts, and other academic documents
                      </Text>
                      <Progress
                        value={100}
                        size="sm"
                        colorScheme="green"
                        mt={2}
                      />
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    align="center"
                    spacing={3}
                    width={{ base: "100%", md: "48%" }}
                    position="relative"
                  >
                    <Box position="absolute" top={2} right={2}>
                      <Badge colorScheme="green">Complete</Badge>
                    </Box>
                    <Icon as={MdDescription} boxSize={12} color="orange.500" />
                    <Heading size="sm">Health Documents</Heading>
                    <Box textAlign="center">
                      <Text fontSize="sm">
                        Health Insurance, Vaccination Certificates, and other
                        health documents
                      </Text>
                      <Progress
                        value={100}
                        size="sm"
                        colorScheme="green"
                        mt={2}
                      />
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    align="center"
                    spacing={3}
                    width={{ base: "100%", md: "48%" }}
                    position="relative"
                  >
                    <Box position="absolute" top={2} right={2}>
                      <Badge colorScheme="blue">Optional</Badge>
                    </Box>
                    <Icon as={MdDescription} boxSize={12} color="green.500" />
                    <Heading size="sm">Supporting Documents</Heading>
                    <Box textAlign="center">
                      <Text fontSize="sm">
                        Certificates, Awards, and other supporting documents
                      </Text>
                      <Progress
                        value={40}
                        size="sm"
                        colorScheme="blue"
                        mt={2}
                      />
                    </Box>
                  </VStack>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Document Requests Tab */}
          <TabPanel px={0} pt={5}>
            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              mb={6}
            >
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Document Requests</Heading>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={onRequestModalOpen}
                  >
                    Submit Request
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={4} mb={6}>
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="blue.200"
                    bg="blue.50"
                  >
                    <Heading size="sm" mb={2} color="blue.700">
                      Document Request Information
                    </Heading>
                    <Text fontSize="sm">
                      Academic documents such as transcripts, certificate of
                      enrollment, and other official documents can be requested
                      through this system. Requests are typically processed
                      within 3-5 business days.
                    </Text>
                  </Box>
                </VStack>

                <Heading size="sm" mb={4}>
                  Request History
                </Heading>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Document Type</Th>
                      <Th>Request Date</Th>
                      <Th>Purpose</Th>
                      <Th>Status</Th>
                      <Th>Remarks</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {documentRequestHistory.map((request) => (
                      <Tr key={request.id}>
                        <Td fontWeight="medium">{request.documentType}</Td>
                        <Td>{formatDate(request.requestDate)}</Td>
                        <Td>{request.purpose}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(request.status)}>
                            {request.status === "completed"
                              ? "Completed"
                              : request.status === "processing"
                                ? "Processing"
                                : request.status === "rejected"
                                  ? "Rejected"
                                  : request.status}
                          </Badge>
                        </Td>
                        <Td>{request.remarks}</Td>
                        <Td>
                          {request.status === "completed" ? (
                            <Button
                              leftIcon={<DownloadIcon />}
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                            >
                              Download
                            </Button>
                          ) : (
                            <Button size="sm" isDisabled>
                              {request.status === "processing"
                                ? "Being Processed"
                                : "Not Available"}
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            <Card
              bg={cardBg}
              boxShadow="sm"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader>
                <Heading size="md">Available Documents</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">Academic Transcript</Heading>
                    <Text fontSize="sm">
                      Official transcript with stamp and signature
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                      >
                        Request
                      </Button>
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">Certificate of Enrollment</Heading>
                    <Text fontSize="sm">
                      Certificate of active student status
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                      >
                        Request
                      </Button>
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">Recommendation Letter</Heading>
                    <Text fontSize="sm">
                      Recommendation letter from professor or faculty
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                      >
                        Request
                      </Button>
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">GPA Certificate</Heading>
                    <Text fontSize="sm">
                      Certificate stating Grade Point Average
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                      >
                        Request
                      </Button>
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">Certificate of Completion</Heading>
                    <Text fontSize="sm">
                      Certificate of completion of studies
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                        isDisabled
                      >
                        Not Available
                      </Button>
                    </Box>
                  </VStack>

                  <VStack
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">Other Documents</Heading>
                    <Text fontSize="sm">
                      Request for special documents not listed above
                    </Text>
                    <Box mt="auto" pt={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<AddIcon />}
                        onClick={onRequestModalOpen}
                        width="full"
                      >
                        Request
                      </Button>
                    </Box>
                  </VStack>
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Upload Document Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={onUploadModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload New Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Document Name</FormLabel>
                <Input placeholder="Enter document name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select category">
                  <option value="identity">Identity Documents</option>
                  <option value="academic">Academic Documents</option>
                  <option value="health">Health Documents</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Select File</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  padding={1}
                />
                <FormHelperText>
                  Supported formats: PDF, JPG, PNG. Max 5MB.
                </FormHelperText>
              </FormControl>

              {selectedFile && (
                <Box
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor="green.200"
                  bg="green.50"
                >
                  <HStack>
                    <Icon as={CheckIcon} color="green.500" />
                    <Text>
                      {selectedFile.name} (
                      {Math.round(selectedFile.size / 1024)} KB)
                    </Text>
                  </HStack>
                </Box>
              )}

              <FormControl>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea placeholder="Add a description or notes about this document" />
              </FormControl>

              <FormControl>
                <FormLabel>Expiry Date (Optional)</FormLabel>
                <Input type="date" />
                <FormHelperText>
                  Fill in if the document has an expiry date
                </FormHelperText>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onUploadModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<MdCloudUpload />}
              onClick={handleDocumentUpload}
              isDisabled={!selectedFile}
            >
              Upload Document
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Document Request Modal */}
      <Modal isOpen={isRequestModalOpen} onClose={onRequestModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Document Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Document Type</FormLabel>
                <Select placeholder="Select document type">
                  <option value="transcript">Academic Transcript</option>
                  <option value="active">Certificate of Enrollment</option>
                  <option value="recommendation">Recommendation Letter</option>
                  <option value="gpa">GPA Certificate</option>
                  <option value="other">Other Document</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Request Purpose</FormLabel>
                <Select placeholder="Select request purpose">
                  <option value="scholarship">Scholarship Application</option>
                  <option value="internship">
                    Internship/Practical Training
                  </option>
                  <option value="job">Job Application</option>
                  <option value="visa">Visa Application</option>
                  <option value="transfer">Transfer/Relocation</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Additional Information</FormLabel>
                <Textarea placeholder="Provide additional details about your request" />
              </FormControl>

              <FormControl>
                <FormLabel>Number of Copies</FormLabel>
                <Select defaultValue="1">
                  <option value="1">1 Copy</option>
                  <option value="2">2 Copies</option>
                  <option value="3">3 Copies</option>
                  <option value="4">4 Copies</option>
                  <option value="5">5 Copies</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Pickup Method</FormLabel>
                <Select defaultValue="pickup">
                  <option value="pickup">Pick Up</option>
                  <option value="email">Send via Email</option>
                  <option value="mail">Send via Mail</option>
                </Select>
              </FormControl>

              <Box
                p={3}
                borderWidth="1px"
                borderRadius="md"
                borderColor="blue.200"
                bg="blue.50"
              >
                <HStack spacing={2} align="flex-start">
                  <Icon as={InfoIcon} color="blue.500" mt={1} />
                  <Text fontSize="sm">
                    Official documents may be subject to administrative fees
                    depending on the type and number of documents requested.
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRequestModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleDocumentRequest}>
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileDocumentsPage;
