
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({
      title: "My Latest Beadworking Project",
      author_id: 2,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Beadwork_Wire_Art_and_Crafts_(27).JPG",
      description: 'Easy weekend project for intermediate bead workers. You will need beads, thin and sturdy wireing, and glue. War gloves when working to avoid the pokey wires!',
      votes: 5,
      favorite: false
    }),
    knex('posts').insert({
      title: "Custom DIY Glass Wall",
      author_id: 1,
      imageUrl: 'https://pixabay.com/static/uploads/photo/2014/03/05/20/04/wall-decor-280350_960_720.jpg',
      description: 'Create a unique glass wall from recycled materials. Gather glass bottles, checkout antique stores, be creative! Concrete sets quickly and needs to be carefully applied.',
      votes: 7,
      favorite: false
    }),
    knex('posts').insert({
      title: "Fun & Colorful Scarves",
      author_id: 1,
      imageUrl: 'https://pixabay.com/static/uploads/photo/2013/03/25/15/55/scarves-96684_960_720.jpg',
      description: 'These fun, bright, and colorful scarves will make the perfect addition t any outfit. Checkout the knitting pattern and style guide. A fast knitter can make one in just four hours.',
      votes: 3,
      favorite: false
    }),
    knex('posts').insert({
      title: "Air Terrariums",
      author_id: 1,
      imageUrl: 'https://i.ytimg.com/vi/yVdBssZBN1k/maxresdefault.jpg',
      description: 'Terrariums are in fashion this year and they are really simple to make. Find a unique jar, add some sand and small rocks, then lastly put in some moss, leaves, and decorations. Easy enough for any kid over five to make!',
      votes: 12,
      favorite: false
    }),
    knex('posts').insert({
      title: "Cutsy Birdhouses for Eastern Songbirds",
      author_id: 2,
      imageUrl: 'https://pixabay.com/static/uploads/photo/2012/12/24/08/40/bird-house-72332_960_720.jpg',
      description: 'Not only are thses birdhouses cute, but they are also specifically designed to attract eastern songbirds to your yard. Place at least five feet off the ground to attract the most songbirds.',
      votes: 1,
      favorite: false
    })
  );
};
