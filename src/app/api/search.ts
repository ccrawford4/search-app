export async function getResults(searchTerm: string) {
    const productionLink =
      "https://searchapi.livelydune-ad0f5c07.westus.azurecontainerapps.io/search";
    const localLink = "http://localhost:8080/search";
    try {
      const response = await fetch(
       process.env.NODE_ENV === "production" ? productionLink : localLink,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SearchTerm: searchTerm,
          }),
        }
      );
      if (!response.ok) {
        console.log("Error: ", response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.log("Fetch error: ", error);
      return [];
    }
}