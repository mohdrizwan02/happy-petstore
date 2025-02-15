import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [
    {
      name: "Black",
      value: "black",
    },
    {
      name: "Brown",
      value: "brown",
    },
    {
      name: "White",
      value: "white",
    },
    {
      name: "Golden",
      value: "golden",
    },
    {
      name: "Gray",
      value: "grey",
    },
  ],
  pets: [
    {
      name: "Dog",
      value: "dog",
      breed: [
        { name: "Labrador Retriever", value: "labrador-retriever" },
        { name: "German Shepherd", value: "german-shepherd" },
        { name: "Golden Retriever", value: "golden-retriever" },
        { name: "French Bulldog", value: "french-bulldog" },
        { name: "Bulldog", value: "bulldog" },
        { name: "Poodle", value: "poodle" },
        { name: "Beagle", value: "beagle" },
        { name: "Rottweiler", value: "rottweiler" },
        { name: "Dachshund", value: "dachshund" },
        { name: "Doberman", value: "doberman" },
      ],
    },
    {
      name: "Cat",
      value: "cat",
      breed: [
        { name: "Persian", value: "persian" },
        { name: "Maine Coon", value: "maine-coon" },
        { name: "Siamese", value: "siamese" },
        { name: "Bengal", value: "bengal" },
        { name: "Ragdoll", value: "ragdoll" },
        { name: "Sphynx", value: "sphynx" },
        { name: "Scottish Fold", value: "scottish-fold" },
        { name: "Abyssinian", value: "abyssinian" },
        { name: "British Shorthair", value: "british-shorthair" },
        { name: "American Shorthair", value: "american-shorthair" },
      ],
    },
    {
      name: "Bird",
      value: "bird",
      breed: [
        { name: "Parrot", value: "parrot" },
        { name: "Canary", value: "canary" },
        { name: "Finch", value: "finch" },
        { name: "Cockatiel", value: "cockatiel" },
        { name: "Budgerigar", value: "budgerigar" },
        { name: "Lovebird", value: "lovebird" },
        { name: "Macaw", value: "macaw" },
        { name: "Conure", value: "conure" },
        { name: "Cockatoo", value: "cockatoo" },
        { name: "African Grey", value: "african-grey" },
      ],
    },
  ],

  states: [
    {
      name: "Andhra Pradesh",
      value: "andhra_pradesh",
      cities: [
        { name: "Visakhapatnam", value: "visakhapatnam" },
        { name: "Vijayawada", value: "vijayawada" },
        { name: "Guntur", value: "guntur" },
        { name: "Tirupati", value: "tirupati" },
        { name: "Nellore", value: "nellore" },
      ],
    },
    {
      name: "Arunachal Pradesh",
      value: "arunachal_pradesh",
      cities: [
        { name: "Itanagar", value: "itanagar" },
        { name: "Tawang", value: "tawang" },
        { name: "Ziro", value: "ziro" },
        { name: "Bomdila", value: "bomdila" },
        { name: "Pasighat", value: "pasighat" },
      ],
    },
    {
      name: "Assam",
      value: "assam",
      cities: [
        { name: "Guwahati", value: "guwahati" },
        { name: "Dibrugarh", value: "dibrugarh" },
        { name: "Jorhat", value: "jorhat" },
        { name: "Silchar", value: "silchar" },
        { name: "Tezpur", value: "tezpur" },
      ],
    },
    {
      name: "Bihar",
      value: "bihar",
      cities: [
        { name: "Patna", value: "patna" },
        { name: "Gaya", value: "gaya" },
        { name: "Muzaffarpur", value: "muzaffarpur" },
        { name: "Bhagalpur", value: "bhagalpur" },
        { name: "Purnia", value: "purnia" },
      ],
    },
    {
      name: "Chhattisgarh",
      value: "chhattisgarh",
      cities: [
        { name: "Raipur", value: "raipur" },
        { name: "Bhilai", value: "bhilai" },
        { name: "Bilaspur", value: "bilaspur" },
        { name: "Korba", value: "korba" },
        { name: "Durg", value: "durg" },
      ],
    },
    {
      name: "Goa",
      value: "goa",
      cities: [
        { name: "Panaji", value: "panaji" },
        { name: "Margao", value: "margao" },
        { name: "Vasco da Gama", value: "vasco_da_gama" },
        { name: "Mapusa", value: "mapusa" },
        { name: "Ponda", value: "ponda" },
      ],
    },
    {
      name: "Gujarat",
      value: "gujarat",
      cities: [
        { name: "Ahmedabad", value: "ahmedabad" },
        { name: "Surat", value: "surat" },
        { name: "Vadodara", value: "vadodara" },
        { name: "Rajkot", value: "rajkot" },
        { name: "Gandhinagar", value: "gandhinagar" },
      ],
    },
    {
      name: "Haryana",
      value: "haryana",
      cities: [
        { name: "Gurugram", value: "gurugram" },
        { name: "Faridabad", value: "faridabad" },
        { name: "Panipat", value: "panipat" },
        { name: "Ambala", value: "ambala" },
        { name: "Hisar", value: "hisar" },
      ],
    },
    {
      name: "Telangana",
      value: "telangana",
      cities: [
        { name: "Hyderabad", value: "hyderabad" },
        { name: "Warangal", value: "warangal" },
        { name: "Nizamabad", value: "nizamabad" },
        { name: "Karimnagar", value: "karimnagar" },
        { name: "Khammam", value: "khammam" },
      ],
    },
    {
      name: "Tamil Nadu",
      value: "tamil_nadu",
      cities: [
        { name: "Chennai", value: "chennai" },
        { name: "Coimbatore", value: "coimbatore" },
        { name: "Madurai", value: "madurai" },
        { name: "Tiruchirappalli", value: "tiruchirappalli" },
        { name: "Salem", value: "salem" },
      ],
    },
    {
      name: "West Bengal",
      value: "west_bengal",
      cities: [
        { name: "Kolkata", value: "kolkata" },
        { name: "Howrah", value: "howrah" },
        { name: "Durgapur", value: "durgapur" },
        { name: "Asansol", value: "asansol" },
        { name: "Siliguri", value: "siliguri" },
      ],
    },
    {
      name: "Uttar Pradesh",
      value: "uttar_pradesh",
      cities: [
        { name: "Lucknow", value: "lucknow" },
        { name: "Kanpur", value: "kanpur" },
        { name: "Varanasi", value: "varanasi" },
        { name: "Agra", value: "agra" },
        { name: "Allahabad", value: "allahabad" },
      ],
    },
    {
      name: "Delhi",
      value: "delhi",
      cities: [
        { name: "New Delhi", value: "new_delhi" },
        { name: "Dwarka", value: "dwarka" },
        { name: "Saket", value: "saket" },
        { name: "Karol Bagh", value: "karol_bagh" },
        { name: "Rohini", value: "rohini" },
      ],
    },
    {
      name: "Maharashtra",
      value: "maharashtra",
      cities: [
        { name: "Mumbai", value: "mumbai" },
        { name: "Pune", value: "pune" },
        { name: "Nagpur", value: "nagpur" },
        { name: "Nashik", value: "nashik" },
        { name: "Aurangabad", value: "aurangabad" },
      ],
    },
    {
      name: "Madhya Pradesh",
      value: "madhya_pradesh",
      cities: [
        { name: "Bhopal", value: "bhopal" },
        { name: "Indore", value: "indore" },
        { name: "Gwalior", value: "gwalior" },
        { name: "Jabalpur", value: "jabalpur" },
        { name: "Ujjain", value: "ujjain" },
      ],
    },
    {
      name: "Kerala",
      value: "kerala",
      cities: [
        { name: "Thiruvananthapuram", value: "thiruvananthapuram" },
        { name: "Kochi", value: "kochi" },
        { name: "Kozhikode", value: "kozhikode" },
        { name: "Thrissur", value: "thrissur" },
        { name: "Alappuzha", value: "alappuzha" },
      ],
    },
    {
      name: "Karnataka",
      value: "karnataka",
      cities: [
        { name: "Bengaluru", value: "bengaluru" },
        { name: "Mysuru", value: "mysuru" },
        { name: "Hubballi", value: "hubballi" },
        { name: "Mangaluru", value: "mangaluru" },
        { name: "Belagavi", value: "belagavi" },
      ],
    },
  ],
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
});

export const {} = petSlice.actions;
export default petSlice.reducer;
