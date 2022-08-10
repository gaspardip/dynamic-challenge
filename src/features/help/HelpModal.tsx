import {
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  UnorderedList,
} from "@chakra-ui/react";
import { useTries } from "~/context/MathlerContext";
import { Cell } from "../grid/Cell";
import { BaseRow } from "../grid/Row";

const spacing = 2;

export const HelpModal = (props: Omit<ModalProps, "children">) => {
  const tries = useTries();

  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How to play Mathler</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList spacing={spacing}>
            <ListItem>
              Try to find the hidden calculation in {tries} guesses!
            </ListItem>
            <ListItem>
              After each guess, the color of the tiles will change to show how
              close you are to the solution.
            </ListItem>
          </UnorderedList>
          <BaseRow py={spacing * 2} justify="center">
            <Cell status="correct">5</Cell>
            <Cell status="incorrect">0</Cell>
            <Cell status="correct">/</Cell>
            <Cell status="almost">5</Cell>
            <Cell status="incorrect">-</Cell>
            <Cell status="incorrect">2</Cell>
          </BaseRow>
          <UnorderedList spacing={spacing}>
            <ListItem>Green are in the correct place.</ListItem>
            <ListItem>
              Yellow are in the solution, but in a different place.
            </ListItem>
            <ListItem>Gray are not in the solution.</ListItem>
          </UnorderedList>
          <Heading as="h4" size="md" py={4}>
            Additional rules
          </Heading>
          <UnorderedList spacing={spacing} pb={spacing}>
            <ListItem>
              Numbers and operators can appear multiple times.
            </ListItem>
            <ListItem>
              Calculate / or * before - or + (order of operations).
            </ListItem>
            <ListItem>
              Commutative solutions are accepted, for example 20+7+3 and 3+7+20.
            </ListItem>
            <ListItem>
              Commutative solutions will be automatically rearranged to the
              exact solution.
            </ListItem>
          </UnorderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
