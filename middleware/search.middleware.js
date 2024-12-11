const searchQuery = (req, res, next) => {
    try {
      const { query, brand, category, minPrice, maxPrice } = req.query;
  
      let search = {};  
  
      // Text search for name and description fields
      if (query) {
        search.$text = { $search: query };
      }
  
      // Brand filter (case-insensitive)
      if (brand) {
        search.brand = { $regex: new RegExp(`^${brand}$`, 'i') }; // Case-insensitive regex
      }
  
      // Category filter (case-insensitive)
      if (category) {
        search.category = { $regex: new RegExp(`^${category}$`, 'i') }; // Case-insensitive regex
      }
  
      // Price range filter
      if (minPrice || maxPrice) {
        search.price = {};
        if (minPrice) {
          search.price.$gte = parseFloat(minPrice); // Ensure it's a number
        }
        if (maxPrice) {
          search.price.$lte = parseFloat(maxPrice);
        }
      }
  
      req.search = search;
      next();  // Pass control to the next middleware/controller
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server error" });  // Return 500 for internal errors
    }
  };
  
  module.exports = searchQuery;
  