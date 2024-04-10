function routes(app, db, accounts, contactList) {
  app.post("/contacts", async (request, response) => {
    const { name, phone } = request.body;

    try {
      await contactList.methods
        .createContact(name, phone)
        .send({ from: accounts[0], gas: 1000000 });
      response.status(201).json({ message: "Contact created successfully" });
    } catch (error) {
      console.error("Error creating contact:", error);
      response.status(500).json({ error: "Failed to create contact" });
    }
  });

  app.get("/contacts", async (request, response) => {
    try {
      const allContacts = await contactList.methods.getAllContacts().call();
      const serializedContacts = allContacts.map((contact) => ({
        id: contact.id.toString(),
        name: contact.name,
        phone: contact.phone.toString(),
      }));
      response.json(serializedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      response.status(500).json({ error: "Failed to fetch contacts" });
    }
  });
}

module.exports = routes;
