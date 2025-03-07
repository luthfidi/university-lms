import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Badge,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
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
  Link,
  Select,
  Progress,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  DownloadIcon,
  ExternalLinkIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import {
  MdOutlinePayment,
  MdAttachMoney,
  MdReceipt,
  MdHistory,
  MdSchool,
  MdAccountBalance,
  MdPictureAsPdf,
  MdCreditCard,
  MdPayment,
  MdOutlineFileUpload,
} from "react-icons/md";
import useAuthStore from "@/store/authStore";

// Mock data for financial status
const financialData = {
  currentBalance: -2500000,
  totalPayable: 12500000,
  totalPaid: 10000000,
  dueDate: "2025-04-15T23:59:59",
  status: "partially_paid",
  academicPeriod: "Odd Semester 2024/2025",
  paymentHistory: [
    {
      id: "pay-001",
      amount: 5000000,
      date: "2025-01-15T14:30:00",
      method: "bank_transfer",
      bank: "Bank Mandiri",
      referenceNumber: "TRX123456789",
      description: "First Installment",
      status: "completed",
    },
    {
      id: "pay-002",
      amount: 5000000,
      date: "2025-02-15T10:45:00",
      method: "virtual_account",
      bank: "BCA",
      referenceNumber: "VA987654321",
      description: "Second Installment",
      status: "completed",
    },
  ],
  breakdown: [
    {
      item: "Tuition Fee",
      amount: 10000000,
      description: "Base tuition fee for the semester",
    },
    {
      item: "Activity Fee",
      amount: 500000,
      description: "Student activities and organizations",
    },
    {
      item: "Technology Fee",
      amount: 750000,
      description: "Technology resources and access",
    },
    {
      item: "Development Fee",
      amount: 1000000,
      description: "Campus development and maintenance",
    },
    {
      item: "Library Fee",
      amount: 250000,
      description: "Library resources and access",
    },
  ],
  invoices: [
    {
      id: "inv-001",
      amount: 12500000,
      issueDate: "2025-01-01T00:00:00",
      dueDate: "2025-01-15T23:59:59",
      description: "Tuition and Fees for Odd Semester 2024/2025",
      status: "partially_paid",
      downloadUrl: "/invoices/inv-001.pdf",
    },
  ],
  paymentMethods: [
    {
      id: "method-001",
      name: "Bank Transfer",
      type: "bank_transfer",
      icon: MdAccountBalance,
      details: {
        bankName: "Bank Mandiri",
        accountNumber: "123-456-7890",
        accountName: "University Name",
      },
    },
    {
      id: "method-002",
      name: "Virtual Account",
      type: "virtual_account",
      icon: MdCreditCard,
      details: {
        bankName: "BCA",
        accountNumber: "987654321",
        accountName: "Student Name",
        expiryDate: "2025-04-15T23:59:59",
      },
    },
    {
      id: "method-003",
      name: "Credit Card",
      type: "credit_card",
      icon: MdPayment,
      details: {
        supportedCards: ["Visa", "MasterCard"],
        processingFee: "2.5%",
      },
    },
  ],
};

// Scholarship data
const scholarshipData = {
  current: [
    {
      id: "sch-001",
      name: "Merit Scholarship",
      provider: "University",
      amount: 5000000,
      startDate: "2024-09-01T00:00:00",
      endDate: "2025-08-31T23:59:59",
      category: "academic",
      status: "active",
      description: "Scholarship awarded based on academic achievement.",
    },
  ],
  history: [
    {
      id: "sch-002",
      name: "Community Service Scholarship",
      provider: "University",
      amount: 3000000,
      startDate: "2023-09-01T00:00:00",
      endDate: "2024-08-31T23:59:59",
      category: "service",
      status: "expired",
      description: "Scholarship awarded for community service contributions.",
    },
  ],
  available: [
    {
      id: "sch-003",
      name: "Research Scholarship",
      provider: "Research Foundation",
      amount: 7500000,
      applicationDeadline: "2025-05-15T23:59:59",
      category: "research",
      eligibility:
        "GPA 3.5 or higher, enrolled in science or engineering program",
      description:
        "Scholarship for students conducting research in STEM fields.",
    },
    {
      id: "sch-004",
      name: "Leadership Scholarship",
      provider: "Alumni Association",
      amount: 4000000,
      applicationDeadline: "2025-04-30T23:59:59",
      category: "leadership",
      eligibility:
        "Demonstrated leadership in campus organizations, minimum GPA 3.0",
      description: "Scholarship recognizing student leadership qualities.",
    },
  ],
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
    case "completed":
    case "active":
      return "green";
    case "partially_paid":
    case "pending":
      return "yellow";
    case "expired":
      return "gray";
    case "unpaid":
    case "overdue":
    case "failed":
      return "red";
    default:
      return "gray";
  }
};

// Helper function to get method display
const getMethodDisplay = (method: string) => {
  switch (method) {
    case "bank_transfer":
      return "Bank Transfer";
    case "virtual_account":
      return "Virtual Account";
    case "credit_card":
      return "Credit Card";
    default:
      return method;
  }
};

// Helper to calculate days until due
const getDaysUntilDue = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `${diffDays} days remaining`;
};

const FinancialPage = () => {
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState(
    "Odd Semester 2024/2025"
  );
  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure();
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Total amount due this semester
  const totalDue = financialData.totalPayable - financialData.totalPaid;

  // Payment status component
  const PaymentStatusAlert = () => {
    if (totalDue <= 0) {
      return (
        <Alert status="success" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Payment Complete</AlertTitle>
            <AlertDescription>
              You have paid all your fees for this semester. Thank you!
            </AlertDescription>
          </Box>
        </Alert>
      );
    }

    const daysMessage = getDaysUntilDue(financialData.dueDate);

    if (daysMessage === "Overdue") {
      return (
        <Alert status="error" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Payment Overdue</AlertTitle>
            <AlertDescription>
              Your payment is overdue. Please make the payment as soon as
              possible to avoid penalties.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }

    if (
      daysMessage === "Due today" ||
      daysMessage === "Due tomorrow" ||
      parseInt(daysMessage) < 7
    ) {
      return (
        <Alert status="warning" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Payment Due Soon</AlertTitle>
            <AlertDescription>
              Your payment is due soon ({daysMessage}). Please make the payment
              to avoid late fees.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }

    return (
      <Alert status="info" borderRadius="md" mb={6}>
        <AlertIcon />
        <Box>
          <AlertTitle>Payment Required</AlertTitle>
          <AlertDescription>
            You have an outstanding balance of {formatCurrency(totalDue)}. Due
            date: {formatDate(financialData.dueDate)} ({daysMessage}).
          </AlertDescription>
        </Box>
      </Alert>
    );
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Financial Management
        </Heading>
        <Text color="gray.500">
          Manage your tuition fees, payments, and scholarships
        </Text>
      </Box>

      {/* Academic Period Selector */}
      <Card
        bg={cardBg}
        boxShadow="sm"
        borderRadius="lg"
        mb={6}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            gap={4}
          >
            <Box>
              <Text fontWeight="bold" mb={2}>
                Academic Period
              </Text>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                maxW="400px"
              >
                <option value="Odd Semester 2024/2025">
                  Odd Semester 2024/2025
                </option>
                <option value="Even Semester 2023/2024">
                  Even Semester 2023/2024
                </option>
                <option value="Odd Semester 2023/2024">
                  Odd Semester 2023/2024
                </option>
              </Select>
            </Box>

            <HStack spacing={4}>
              <Button
                leftIcon={<MdReceipt />}
                colorScheme="blue"
                variant="outline"
                onClick={() => window.open("/invoices/inv-001.pdf", "_blank")}
              >
                Download Invoice
              </Button>
              <Button
                leftIcon={<MdOutlinePayment />}
                colorScheme="blue"
                onClick={onPaymentOpen}
              >
                Make Payment
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Payment Status Alert */}
      <PaymentStatusAlert />

      {/* Financial Summary */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Card
          bg={cardBg}
          boxShadow="sm"
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Current Balance</StatLabel>
              <StatNumber
                color={totalDue > 0 ? "red.500" : "green.500"}
                fontSize={{ base: "xl", md: "2xl" }}
              >
                {formatCurrency(financialData.currentBalance)}
              </StatNumber>
              <StatHelpText>
                {totalDue > 0 ? "Amount Due" : "Credit Balance"}
              </StatHelpText>
              {totalDue > 0 && (
                <Button
                  size="sm"
                  colorScheme="blue"
                  mt={2}
                  onClick={onPaymentOpen}
                >
                  Pay Now
                </Button>
              )}
            </Stat>
          </CardBody>
        </Card>

        <Card
          bg={cardBg}
          boxShadow="sm"
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Payment Status</StatLabel>
              <HStack mt={2}>
                <StatNumber fontSize={{ base: "xl", md: "2xl" }}>
                  {Math.round(
                    (financialData.totalPaid / financialData.totalPayable) * 100
                  )}
                  %
                </StatNumber>
                <Badge
                  colorScheme={getStatusColor(financialData.status)}
                  fontSize="md"
                  py={1}
                  px={2}
                >
                  {financialData.status === "paid"
                    ? "Paid"
                    : financialData.status === "partially_paid"
                      ? "Partially Paid"
                      : financialData.status === "unpaid"
                        ? "Unpaid"
                        : financialData.status === "overdue"
                          ? "Overdue"
                          : "Unknown"}
                </Badge>
              </HStack>
              <Box mt={3}>
                <Progress
                  value={
                    (financialData.totalPaid / financialData.totalPayable) * 100
                  }
                  size="sm"
                  colorScheme="green"
                  borderRadius="full"
                />
              </Box>
              <StatHelpText mt={2}>
                {formatCurrency(financialData.totalPaid)} of{" "}
                {formatCurrency(financialData.totalPayable)}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card
          bg={cardBg}
          boxShadow="sm"
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Due Date</StatLabel>
              <StatNumber fontSize={{ base: "xl", md: "2xl" }}>
                {formatDate(financialData.dueDate)}
              </StatNumber>
              <StatHelpText>
                <Badge
                  colorScheme={
                    getDaysUntilDue(financialData.dueDate) === "Overdue"
                      ? "red"
                      : getDaysUntilDue(financialData.dueDate) === "Due today"
                        ? "orange"
                        : getDaysUntilDue(financialData.dueDate) ===
                            "Due tomorrow"
                          ? "orange"
                          : "green"
                  }
                >
                  {getDaysUntilDue(financialData.dueDate)}
                </Badge>
              </StatHelpText>
              {totalDue > 0 &&
                getDaysUntilDue(financialData.dueDate) !== "Overdue" && (
                  <Text fontSize="sm" mt={2} color="gray.500">
                    Please make payment before the due date to avoid late fees.
                  </Text>
                )}
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Tabs Section */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Fee Breakdown</Tab>
          <Tab>Payment History</Tab>
          <Tab>Scholarships</Tab>
          <Tab>Payment Methods</Tab>
        </TabList>

        <TabPanels>
          {/* Fee Breakdown Tab */}
          <TabPanel px={0} pt={5}>
            <Card variant="outline">
              <CardBody>
                <Heading size="md" mb={4}>
                  Tuition and Fee Breakdown
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Description</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {financialData.breakdown.map((item, index) => (
                      <Tr key={index}>
                        <Td fontWeight="medium">{item.item}</Td>
                        <Td>{item.description}</Td>
                        <Td isNumeric>{formatCurrency(item.amount)}</Td>
                      </Tr>
                    ))}
                    <Tr fontWeight="bold">
                      <Td>Total</Td>
                      <Td></Td>
                      <Td isNumeric>
                        {formatCurrency(financialData.totalPayable)}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Divider my={6} />

                <Heading size="md" mb={4}>
                  Invoices
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Invoice #</Th>
                      <Th>Description</Th>
                      <Th>Issue Date</Th>
                      <Th>Due Date</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {financialData.invoices.map((invoice) => (
                      <Tr key={invoice.id}>
                        <Td fontWeight="medium">{invoice.id}</Td>
                        <Td>{invoice.description}</Td>
                        <Td>{formatDate(invoice.issueDate)}</Td>
                        <Td>{formatDate(invoice.dueDate)}</Td>
                        <Td>{formatCurrency(invoice.amount)}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(invoice.status)}>
                            {invoice.status === "paid"
                              ? "Paid"
                              : invoice.status === "partially_paid"
                                ? "Partially Paid"
                                : invoice.status === "unpaid"
                                  ? "Unpaid"
                                  : invoice.status === "overdue"
                                    ? "Overdue"
                                    : "Unknown"}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Download invoice"
                              icon={<DownloadIcon />}
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                window.open(invoice.downloadUrl, "_blank")
                              }
                            />
                            {invoice.status !== "paid" && (
                              <IconButton
                                aria-label="Pay invoice"
                                icon={<MdOutlinePayment />}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                                onClick={onPaymentOpen}
                              />
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Payment History Tab */}
          <TabPanel px={0} pt={5}>
            <Card variant="outline" mb={6}>
              <CardBody>
                <Flex
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                  mb={4}
                >
                  <Heading size="md">Payment History</Heading>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={<MdOutlineFileUpload />}
                      onClick={onUploadOpen}
                    >
                      Upload Receipt
                    </Button>
                    <Select
                      placeholder="Filter by Status"
                      size="sm"
                      maxW="200px"
                    >
                      <option value="all">All Payments</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </Select>
                  </HStack>
                </Flex>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Description</Th>
                      <Th>Method</Th>
                      <Th>Reference #</Th>
                      <Th isNumeric>Amount</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {financialData.paymentHistory.map((payment) => (
                      <Tr key={payment.id}>
                        <Td>{formatDate(payment.date)}</Td>
                        <Td fontWeight="medium">{payment.description}</Td>
                        <Td>
                          <HStack>
                            <Text>{getMethodDisplay(payment.method)}</Text>
                            <Badge variant="outline" colorScheme="blue">
                              {payment.bank}
                            </Badge>
                          </HStack>
                        </Td>
                        <Td>{payment.referenceNumber}</Td>
                        <Td isNumeric>{formatCurrency(payment.amount)}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(payment.status)}>
                            {payment.status === "completed"
                              ? "Completed"
                              : payment.status === "pending"
                                ? "Pending"
                                : payment.status === "failed"
                                  ? "Failed"
                                  : payment.status}
                          </Badge>
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Download receipt"
                            icon={<MdReceipt />}
                            size="sm"
                            variant="ghost"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                {financialData.paymentHistory.length === 0 && (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.500">
                      No payment history found for this period.
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Payment Verification</AlertTitle>
                <AlertDescription>
                  Payments may take 1-3 business days to be verified and
                  reflected in your account. If your payment is not reflected
                  after 3 business days, please contact the finance office.
                </AlertDescription>
              </Box>
            </Alert>
          </TabPanel>

          {/* Scholarships Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Current Scholarships */}
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Current Scholarships
                  </Heading>

                  {scholarshipData.current.length > 0 ? (
                    <VStack spacing={4} align="stretch">
                      {scholarshipData.current.map((scholarship) => (
                        <Card key={scholarship.id} variant="outline">
                          <CardBody>
                            <Flex justify="space-between" mb={2}>
                              <Heading size="sm">{scholarship.name}</Heading>
                              <Badge colorScheme="green">Active</Badge>
                            </Flex>

                            <Text fontSize="sm" color="gray.500" mb={3}>
                              Provided by {scholarship.provider}
                            </Text>

                            <SimpleGrid columns={2} spacing={4} mb={3}>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium">
                                  Amount
                                </Text>
                                <Text>
                                  {formatCurrency(scholarship.amount)}
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium">
                                  Period
                                </Text>
                                <Text>
                                  {formatDate(scholarship.startDate)} -{" "}
                                  {formatDate(scholarship.endDate)}
                                </Text>
                              </Box>
                            </SimpleGrid>

                            <Text fontSize="sm">{scholarship.description}</Text>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  ) : (
                    <Box textAlign="center" py={6}>
                      <Text mb={4}>
                        You don't have any active scholarships.
                      </Text>
                      <Button colorScheme="blue" size="sm">
                        Browse Available Scholarships
                      </Button>
                    </Box>
                  )}
                </CardBody>
              </Card>

              {/* Scholarship History */}
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4}>
                    Scholarship History
                  </Heading>

                  {scholarshipData.history.length > 0 ? (
                    <VStack spacing={4} align="stretch">
                      {scholarshipData.history.map((scholarship) => (
                        <Card key={scholarship.id} variant="outline">
                          <CardBody>
                            <Flex justify="space-between" mb={2}>
                              <Heading size="sm">{scholarship.name}</Heading>
                              <Badge colorScheme="gray">Expired</Badge>
                            </Flex>

                            <Text fontSize="sm" color="gray.500" mb={3}>
                              Provided by {scholarship.provider}
                            </Text>

                            <SimpleGrid columns={2} spacing={4} mb={3}>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium">
                                  Amount
                                </Text>
                                <Text>
                                  {formatCurrency(scholarship.amount)}
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium">
                                  Period
                                </Text>
                                <Text>
                                  {formatDate(scholarship.startDate)} -{" "}
                                  {formatDate(scholarship.endDate)}
                                </Text>
                              </Box>
                            </SimpleGrid>

                            <Text fontSize="sm">{scholarship.description}</Text>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  ) : (
                    <Box textAlign="center" py={6}>
                      <Text>No scholarship history found.</Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Available Scholarships */}
            <Card variant="outline" mt={6}>
              <CardBody>
                <Heading size="md" mb={4}>
                  Available Scholarships
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {scholarshipData.available.map((scholarship) => (
                    <Card key={scholarship.id} variant="outline">
                      <CardBody>
                        <Heading size="sm" mb={2}>
                          {scholarship.name}
                        </Heading>
                        <Text fontSize="sm" color="gray.500" mb={3}>
                          Provided by {scholarship.provider}
                        </Text>

                        <HStack mb={3}>
                          <Badge colorScheme="purple">
                            {scholarship.category}
                          </Badge>
                          <Text fontSize="sm" fontWeight="medium">
                            {formatCurrency(scholarship.amount)}
                          </Text>
                        </HStack>

                        <Text fontSize="sm" mb={3}>
                          {scholarship.description}
                        </Text>

                        <Box bg="gray.50" p={2} borderRadius="md" mb={3}>
                          <Text fontSize="sm" fontWeight="medium">
                            Eligibility:
                          </Text>
                          <Text fontSize="sm">{scholarship.eligibility}</Text>
                        </Box>

                        <HStack justify="space-between" align="center">
                          <Text fontSize="xs" color="gray.500">
                            Deadline:{" "}
                            {formatDate(scholarship.applicationDeadline)}
                          </Text>
                          <Button size="sm" colorScheme="blue">
                            Apply Now
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>

                {scholarshipData.available.length === 0 && (
                  <Box textAlign="center" py={6}>
                    <Text>No scholarships available at this time.</Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>

          {/* Payment Methods Tab */}
          <TabPanel px={0} pt={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {financialData.paymentMethods.map((method) => (
                <Card key={method.id} variant="outline">
                  <CardBody>
                    <Flex align="center" mb={4}>
                      <Box
                        p={3}
                        borderRadius="md"
                        bg="blue.50"
                        color="blue.500"
                        mr={4}
                      >
                        <Icon as={method.icon} boxSize={6} />
                      </Box>
                      <Box>
                        <Heading size="md">{method.name}</Heading>
                        <Text color="gray.500">
                          {getMethodDisplay(method.type)}
                        </Text>
                      </Box>
                    </Flex>

                    <Box bg="gray.50" p={3} borderRadius="md" mb={4}>
                      {method.type === "bank_transfer" && (
                        <VStack align="stretch" spacing={2}>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Bank Name:
                            </Text>
                            <Text fontSize="sm">{method.details.bankName}</Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Account Number:
                            </Text>
                            <Text fontSize="sm" fontFamily="mono">
                              {method.details.accountNumber}
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Account Name:
                            </Text>
                            <Text fontSize="sm">
                              {method.details.accountName}
                            </Text>
                          </Flex>
                        </VStack>
                      )}

                      {method.type === "virtual_account" && (
                        <VStack align="stretch" spacing={2}>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Bank Name:
                            </Text>
                            <Text fontSize="sm">{method.details.bankName}</Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              VA Number:
                            </Text>
                            <Text fontSize="sm" fontFamily="mono">
                              {method.details.accountNumber}
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Account Name:
                            </Text>
                            <Text fontSize="sm">
                              {method.details.accountName}
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Valid Until:
                            </Text>
                            <Text fontSize="sm">
                              {formatDate(method.details.expiryDate)}
                            </Text>
                          </Flex>
                        </VStack>
                      )}

                      {method.type === "credit_card" && (
                        <VStack align="stretch" spacing={2}>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Supported Cards:
                            </Text>
                            <Text fontSize="sm">
                              {method.details.supportedCards.join(", ")}
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text fontSize="sm" fontWeight="medium">
                              Processing Fee:
                            </Text>
                            <Text fontSize="sm">
                              {method.details.processingFee}
                            </Text>
                          </Flex>
                        </VStack>
                      )}
                    </Box>

                    <HStack justify="flex-end">
                      {method.type === "bank_transfer" && (
                        <Button
                          leftIcon={<MdOutlineFileUpload />}
                          colorScheme="blue"
                          size="sm"
                          onClick={onUploadOpen}
                        >
                          Upload Receipt
                        </Button>
                      )}

                      {method.type === "virtual_account" && (
                        <Button
                          leftIcon={<ExternalLinkIcon />}
                          colorScheme="blue"
                          size="sm"
                        >
                          Pay Online
                        </Button>
                      )}

                      {method.type === "credit_card" && (
                        <Button
                          leftIcon={<MdOutlinePayment />}
                          colorScheme="blue"
                          size="sm"
                        >
                          Pay with Card
                        </Button>
                      )}
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            <Alert status="info" mt={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Payment Processing</AlertTitle>
                <AlertDescription>
                  Bank transfers and virtual account payments typically take 1-3
                  business days to process. Credit card payments are processed
                  immediately.
                </AlertDescription>
              </Box>
            </Alert>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Make Payment Modal */}
      <Modal isOpen={isPaymentOpen} onClose={onPaymentClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make a Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Payment Amount
                </Text>
                <HStack align="center">
                  <Text fontSize="2xl" fontWeight="bold">
                    {formatCurrency(totalDue)}
                  </Text>
                  <Badge colorScheme="blue" ml={2}>
                    Balance Due
                  </Badge>
                </HStack>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  Select Payment Method
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  {financialData.paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      variant="outline"
                      cursor="pointer"
                      _hover={{
                        borderColor: "blue.500",
                        transform: "translateY(-2px)",
                        transition: "all 0.2s",
                      }}
                    >
                      <CardBody textAlign="center">
                        <Icon
                          as={method.icon}
                          boxSize={8}
                          mb={2}
                          color="blue.500"
                        />
                        <Text fontWeight="medium">{method.name}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>

              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">
                  After selecting a payment method, you will be redirected to
                  the secure payment page or provided with payment instructions.
                </Text>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPaymentClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Continue to Payment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Upload Receipt Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Payment Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Payment Details
                </Text>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Amount Paid
                    </Text>
                    <Input placeholder="Enter amount" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Payment Date
                    </Text>
                    <Input type="date" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Payment Method
                    </Text>
                    <Select placeholder="Select method">
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="virtual_account">Virtual Account</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Reference Number
                    </Text>
                    <Input placeholder="Transaction reference" />
                  </Box>
                </SimpleGrid>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  Upload Receipt
                </Text>
                <Button
                  leftIcon={<MdOutlineFileUpload />}
                  w="full"
                  h="100px"
                  variant="outline"
                >
                  <VStack spacing={1}>
                    <Text>Click to upload receipt</Text>
                    <Text fontSize="xs" color="gray.500">
                      Supported formats: PDF, JPG, PNG (Max 5MB)
                    </Text>
                  </VStack>
                </Button>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  Additional Notes
                </Text>
                <Textarea placeholder="Any additional information about this payment" />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onUploadClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FinancialPage;
