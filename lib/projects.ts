export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  span: "full" | "half";
  vimeoId: string;
  thumbnail: string;
}

export const projects: Project[] = [
  {
    id: "001",
    index: "001",
    title: "IN THE REARVIEW",
    subtitle: "A young couple gets pulled over — their suspicious behavior leads the officer to believe they are hiding something.",
    category: "FILM",
    year: "2024",
    span: "full",
    vimeoId: "1076485530",
    thumbnail: "https://i.vimeocdn.com/video/2006293042-5c7f78a21289bb580752b77fd9f383993d601f98718df96db7b87bb2a3a633a7-d_640",
  },
  {
    id: "002",
    index: "002",
    title: "PASSAGE",
    subtitle: "Short film",
    category: "FILM",
    year: "2023",
    span: "half",
    vimeoId: "821854158",
    thumbnail: "https://i.vimeocdn.com/video/1662291827-ab023dc6394398173b8635179d07581e91079f27f5fd0f4b103896c96f5a863e-d_640",
  },
  {
    id: "003",
    index: "003",
    title: "THE WAY OUT",
    subtitle: "Short film",
    category: "FILM",
    year: "2023",
    span: "half",
    vimeoId: "821850858",
    thumbnail: "https://i.vimeocdn.com/video/1662286828-c88b2a249e2091cdcbae7d16a90d46f9fecbc591c65be047928a13b34fa3924c-d_640",
  },
  {
    id: "004",
    index: "004",
    title: "GUNK",
    subtitle: "A troubled man makes a sandwich.",
    category: "FILM",
    year: "2022",
    span: "full",
    vimeoId: "781184730",
    thumbnail: "https://i.vimeocdn.com/video/1568075816-6e36fd8b5a6332d91c8bc8bfbe512297a6b108a1de58b512c7c0870ec09f8d2d-d_640",
  },
  {
    id: "005",
    index: "005",
    title: "EDITING REEL 2026",
    subtitle: "A showcase of editing work across film and narrative projects.",
    category: "REEL",
    year: "2026",
    span: "full",
    vimeoId: "1186778498",
    thumbnail: "https://i.vimeocdn.com/video/2150553168-507ab4ca90bd3d23833fef5dc7bd200b5947e3c231ea0735a13147494c09e9d2-d_640",
  },
];
