export const getMainTopicArticle = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/hot`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};
