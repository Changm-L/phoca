import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../../common/utils/constant";
import Modal from "../../../common/modal/Modal";
import WordEditForm from "./WordEditForm";
import {
  Container,
  Header,
  IconBtn,
  CardContainer,
  Card,
  CardHeader,
  CardBody,
  ImageContainer,
  CardImage,
  WordContainer,
  EngWord,
  KorWord,
} from "./Words.style";
import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
import { FaEdit, FaVolumeUp } from "react-icons/fa";
import { Word } from "../../../common/types/wordType";

const getWords = async (wordbookId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/word/all/${wordbookId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
  const result = await res.json();
  return result;
};

function Words() {
  const router = useRouter();
  const wordbookId = router.query.id;

  const [wordList, setWordList] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState("");
  const [selectedWordbookId, setSelectedWordbookId] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);

  const isValid = wordList.length > 0;

  const { data } = useQuery(
    ["getWords", wordbookId],
    () => getWords(wordbookId as string),
    {
      enabled: !!wordbookId,
    },
  );

  const ttsBtnClickHandler = (word: string) => {
    const tts: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(word);
    tts.lang = "en-US";
    window.speechSynthesis.speak(tts);
  };

  const editBtnClickHandler = (wordId: string, wordbookId: string) => {
    setSelectedWordId(wordId);
    setSelectedWordbookId(wordbookId);
    setEditModalOpen(true);
  };

  const modalCloseHandler = () => {
    setEditModalOpen(false);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setWordList(data);
    }
  }, [data]);

  return (
    <>
      <Container $headerHeight={HEADER_HEIGHT} $sidebarWidth={SIDEBAR_WIDTH}>
        <Header>
          <IconBtn>
            <AiOutlineArrowLeft />
          </IconBtn>
          {isValid && wordList[0].wordbook.wordbookName}
        </Header>
        <CardContainer>
          {isValid &&
            wordList.map((item, idx) => (
              <Card key={item.wordId}>
                <CardHeader>
                  <IconBtn
                    onClick={() =>
                      editBtnClickHandler(item.wordId, item.wordbook.wordbookId)
                    }>
                    <FaEdit />
                  </IconBtn>
                  <IconBtn>
                    <AiFillDelete />
                  </IconBtn>
                </CardHeader>
                <CardBody>
                  <ImageContainer>
                    <CardImage
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.wordKey}`}
                      alt={item.wordKey}
                    />
                  </ImageContainer>
                  <WordContainer>
                    <EngWord>
                      {item.wordEng[0]}
                      <IconBtn
                        onClick={() => ttsBtnClickHandler(item.wordEng[0])}>
                        <FaVolumeUp />
                      </IconBtn>
                    </EngWord>
                    <KorWord>{item.wordKor[0]}</KorWord>
                  </WordContainer>
                </CardBody>
              </Card>
            ))}
        </CardContainer>
      </Container>
      {editModalOpen && (
        <Modal
          open={editModalOpen}
          width="600px"
          onClose={modalCloseHandler}
          large={true}>
          <WordEditForm
            wordId={selectedWordId}
            wordbookId={selectedWordbookId}
            onClose={modalCloseHandler}
          />
        </Modal>
      )}
    </>
  );
}

export default Words;
