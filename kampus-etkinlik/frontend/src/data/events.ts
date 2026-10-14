import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.jpg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap."
  },
  {
    id: "event-4",
    title: "Siber Güvenlik 101",
    category: "Seminer",
    capacity: 80,
    date: "2026-11-15",
    time: "13:30",
    location: "B Blok Amfi 3",
    description: "Temel siber güvenlik kavramları ve güncel tehditler."
  },
  {
    id: "event-5",
    title: "Yapay Zeka Söyleşisi",
    category: "Söyleşi",
    capacity: 150,
    date: "2026-12-01",
    time: "16:00",
    location: "Kültür Merkezi",
    description: "Sektörden uzmanlarla yapay zekanın geleceği üzerine sohbet."
  },
  {
    id: "event-6",
    title: "Kodlama Maratonu (Hackathon)",
    category: "Yarışma",
    capacity: 50,
    date: "2026-12-10",
    time: "09:00",
    location: "İnovasyon Merkezi",
    description: "24 saat sürecek takım tabanlı yazılım geliştirme yarışması."
  }
];