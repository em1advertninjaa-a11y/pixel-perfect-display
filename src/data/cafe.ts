// Edit café content here: menu, specials, chefs, reviews, branches, journal.
import latte from "@/assets/latte.jpg";
import toast from "@/assets/toast.jpg";
import pancakes from "@/assets/pancakes.jpg";
import matcha from "@/assets/matcha.jpg";
import brunch from "@/assets/brunch.jpg";
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";
import chefs from "@/assets/chefs.jpg";

export const images = { latte, toast, pancakes, matcha, brunch, hero, interior, chefs };

// Placeholder contact numbers — replace with real ones once provided.
export const MAIN_PHONE = "+910000000000";
export const MAIN_WHATSAPP = "910000000000";
export const EMAIL = "hello@chef11.in";

export const specials = [
  { name: "Leaf Art Latte", desc: "Single-origin Coorg espresso with velvety steamed milk.", price: 220, img: latte },
  { name: "Avocado Sourdough", desc: "Smashed avocado, heirloom tomatoes and microgreens.", price: 380, img: toast },
  { name: "Berry Honey Pancakes", desc: "Buttermilk stack, fresh berries, wild forest honey.", price: 340, img: pancakes },
  { name: "Matcha & Carrot Cake", desc: "Iced ceremonial matcha with our walnut carrot cake.", price: 420, img: matcha },
];

type Item = { name: string; desc: string; price: number; veg: boolean };
export const menu: Record<string, Item[]> = {
  Coffee: [
    { name: "Espresso", desc: "Bold double shot, chocolatey finish.", price: 150, veg: true },
    { name: "Cappuccino", desc: "Equal parts espresso, milk and foam.", price: 200, veg: true },
    { name: "Vietnamese Iced Coffee", desc: "Slow drip over condensed milk.", price: 240, veg: true },
    { name: "Oat Milk Flat White", desc: "Silky micro-foam with organic oat milk.", price: 260, veg: true },
  ],
  Breakfast: [
    { name: "Masala Omelette", desc: "Three eggs, onion, chilli, coriander, toast.", price: 260, veg: false },
    { name: "Granola Bowl", desc: "House granola, curd, seasonal fruit, honey.", price: 280, veg: true },
    { name: "Poha with Peanuts", desc: "Classic Maharashtrian flattened rice.", price: 160, veg: true },
    { name: "Eggs Benedict", desc: "Poached eggs, chicken ham, hollandaise.", price: 390, veg: false },
  ],
  Brunch: [
    { name: "Shakshuka", desc: "Eggs baked in spiced tomato, sourdough.", price: 360, veg: false },
    { name: "Paneer Tikka Wrap", desc: "Charred paneer, mint chutney, greens.", price: 320, veg: true },
    { name: "Grilled Chicken Bowl", desc: "Herbed chicken, quinoa, roasted veggies.", price: 420, veg: false },
    { name: "Pesto Pasta", desc: "Basil pesto, cherry tomatoes, parmesan.", price: 380, veg: true },
  ],
  Desserts: [
    { name: "Walnut Carrot Cake", desc: "Cream cheese frosting, toasted walnuts.", price: 220, veg: true },
    { name: "Tiramisu Jar", desc: "Espresso-soaked layers, mascarpone.", price: 260, veg: true },
    { name: "Gulab Jamun Cheesecake", desc: "Baked cheesecake with a desi twist.", price: 280, veg: true },
  ],
  Beverages: [
    { name: "Iced Matcha Latte", desc: "Ceremonial grade matcha, milk, ice.", price: 280, veg: true },
    { name: "Cold-Pressed Juice", desc: "Beet, apple, carrot and ginger.", price: 220, veg: true },
    { name: "Masala Chai", desc: "Assam tea brewed with whole spices.", price: 120, veg: true },
    { name: "Berry Smoothie", desc: "Mixed berries, banana, yoghurt.", price: 260, veg: true },
  ],
};

export const chefList = [
  { name: "Arjun Patil", role: "Head Chef", pos: "18% 30%" },
  { name: "Meera Kulkarni", role: "Pastry Chef", pos: "50% 30%" },
  { name: "Rohan Deshmukh", role: "Brunch & Grill Chef", pos: "82% 30%" },
];

export const reviews = [
  { name: "Priya S.", text: "The calmest café in town. The avocado toast and flat white are perfection.", stars: 5 },
  { name: "Aditya K.", text: "Lovely plants, great light and genuinely warm staff. Our weekend spot now.", stars: 5 },
  { name: "Sneha R.", text: "Fresh food, quick service, and the carrot cake is unbelievable.", stars: 4 },
];

// Branch details are placeholders until real ones are provided.
export const branches = [
  { city: "Karad", address: "Address to be updated, Karad, Maharashtra", phone: MAIN_PHONE, whatsapp: MAIN_WHATSAPP, hours: "8 AM – 11 PM, all days" },
  { city: "Wai", address: "Address to be updated, Wai, Maharashtra", phone: MAIN_PHONE, whatsapp: MAIN_WHATSAPP, hours: "8 AM – 11 PM, all days" },
];

export const journal = [
  { title: "From Coorg to Your Cup", date: "12 Sep 2026", excerpt: "Meet the small estates behind our single-origin espresso.", img: latte },
  { title: "The Art of a Slow Brunch", date: "28 Aug 2026", excerpt: "Why we believe the best mornings take their time.", img: brunch },
  { title: "Growing Green Inside", date: "05 Aug 2026", excerpt: "How plants shape the calm you feel at CHEF 11.", img: interior },
];

export const gallery = [hero, latte, brunch, interior, toast, pancakes, matcha, chefs];
