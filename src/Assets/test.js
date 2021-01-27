export const getData = (year, branch, subject, subCode, rno) => {
  const data = {
    [year]: {
      [branch]: {
        branch: branch,
        subject: subject,
        subCode: subCode,
        rno: rno,
        questions: [
          {
            id: 0,
            complete: false,
            parts: [
              {
                title: "1A",
                answer: "",

                complete: false,
              },
              {
                title: "1B",
                answer: "",

                complete: false,
              },
              {
                title: "1C",
                answer: "",

                complete: false,
              },
            ],
          },
          {
            id: 1,
            complete: false,
            parts: [
              {
                title: "2A",
                answer: "",

                complete: false,
              },
              {
                title: "2B",
                answer: "",

                complete: false,
              },
              {
                title: "2C",
                answer: "",

                complete: false,
              },
            ],
          },
          {
            id: 2,
            complete: false,
            parts: [
              {
                title: "3A",
                answer: "",

                complete: false,
              },
              {
                title: "3B",
                answer: "",

                complete: false,
              },
              {
                title: "3C",
                answer: "",

                complete: false,
              },
            ],
          },
          {
            id: 3,
            complete: false,
            parts: [
              {
                title: "4A",
                answer: "",

                complete: false,
              },
              {
                title: "4B",
                answer: "",

                complete: false,
              },
              {
                title: "4C",
                answer: "",

                complete: false,
              },
            ],
          },
          {
            id: 4,
            complete: false,
            parts: [
              {
                title: "5A",
                answer: "",

                complete: false,
              },
              {
                title: "5B",
                answer: "",

                complete: false,
              },
              {
                title: "5C",
                answer: "",

                complete: false,
              },
            ],
          },
        ],
      },
    },
  };
  return data;
};
