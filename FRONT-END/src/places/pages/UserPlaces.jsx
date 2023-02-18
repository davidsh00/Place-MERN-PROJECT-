import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
const dummy_data = [
  {
    placeId: "p1",
    title: "Holland",
    description:
      "Holland is a geographical region[2] and former province on the western coast of the Netherlands.[2] From the 10th to the 16th century, Holland proper was a unified political region within the Holy Roman Empire as a county ruled by the counts of Holland. By the 17th century, the province of Holland had risen to become a maritime and economic power, dominating the other provinces of the newly independent Dutch Republic.",
    image:
      "https://lp-cms-production.imgix.net/image_browser/Netherlands%20tulips%20windmillsRF.jpg",
    creatorId: "u1",
    location: {
      lat: 52.191735,
      lng: 3.0369282,
    },
    address: " northwestern Europe with overseas territories in the Caribbean",
  },
  {
    placeId: "p2",
    title: "Shiraz",
    description:
      "Shiraz (/ʃɪəˈrɑːz/ (listen); Persian: شیراز, romanized: Širâz [ʃiːˈɾɒːz] (listen)) is the fifth-most-populous city of Iran[3] and the capital of Fars Province, which has been historically known as Pars (پارس, Pārs) and Persis.[4] As of the 2016 national census, the population of the city was 1,565,572 people, and its built-up area with Sadra was home to almost 1,800,000 inhabitants.[5] A census in 2021 showed an increase in the city's population to 1,995,500 people.[6] Shiraz is located in southwestern Iran on the rudkhaneye khoshk (lit. 'dry river') seasonal river. Founded in the early Islamic period, the city has a moderate climate and has been a regional trade center for over a thousand years.",
    image:
      "https://media.venturatravel.org/unsafe/800x600/smart/day_detail/82db0bb4-8012-4cc2-987c-c50972034c62-nasir_al-_mulk_mosque-_shiraz-cropped.jpg",
    creatorId: "u2",
    location: {
      lat: 29.6663351,
      lng: 52.3906159,
    },
    address: " shiraz iran",
  },
];
const UserPlaces = () => {
  const { uId } = useParams();
  const userPlaces = dummy_data.filter((item) => item.creatorId === uId);
  return <PlacesList items={userPlaces} />;
};
export default UserPlaces;
