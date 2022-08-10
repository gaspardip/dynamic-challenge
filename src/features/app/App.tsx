import { QuestionOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { answerNumber } from "~/constants/answers";
import { Grid } from "../grid/Grid";
import { HelpModal } from "../help/HelpModal";
import { Keyboard } from "../keyboard/Keyboard";
import { SettingsModal } from "../settings/SettingsModal";

export const App = () => {
  const {
    isOpen: isOpenHelpModal,
    onOpen: onOpenHelpModa,
    onClose: onCloseHelpModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSettingsModal,
    onOpen: onOpenSettingsModal,
    onClose: onCloseSettingsModal,
  } = useDisclosure();

  return (
    <>
      <Container
        px={{ base: 4, md: 0 }}
        py={{ base: 8, md: 16 }}
        maxW="xl"
        centerContent
      >
        <Flex w="full" maxW="md">
          <IconButton
            aria-label="How to play?"
            icon={<QuestionOutlineIcon />}
            onClick={onOpenHelpModa}
          />
          <Heading size="xl" m="0 auto">
            MATHLER
          </Heading>
          <IconButton
            aria-label="Statistics"
            icon={<SettingsIcon />}
            onClick={onOpenSettingsModal}
          />
        </Flex>
        <Text py={8} px={{ base: 4, md: 8 }} fontSize="lg" textAlign="center">
          Find the hidden calculation that equals{" "}
          <strong>{answerNumber}</strong>
        </Text>
        <Grid pb={8} />
        <Keyboard />
      </Container>
      <HelpModal isOpen={isOpenHelpModal} onClose={onCloseHelpModal} />
      <SettingsModal
        isOpen={isOpenSettingsModal}
        onClose={onCloseSettingsModal}
      />
    </>
  );
};
