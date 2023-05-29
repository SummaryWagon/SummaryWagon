const makeSummaryRequest = (link: string, email: string) => {
  const res = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles`, {
    method: "POST",
    body: JSON.stringify({
      link,
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
};

export default makeSummaryRequest;