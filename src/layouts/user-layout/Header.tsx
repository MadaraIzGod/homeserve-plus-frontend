"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Heart,UserRound} from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
export default function Header(){const p=usePathname();return <header className="portal-nav"><Link href="/" className="brand">HomeServe<span>+</span></Link><nav><Link className={p==="/dashboard"?"active":""} href="/dashboard">Overview</Link><Link href="/services">Book a service</Link><Link href="/dashboard?tab=bookings">My bookings</Link><Link href="/dashboard?tab=support">Support</Link></nav><div><button aria-label="Favorites"><Heart/></button><NotificationBell/><Link href="/profile" className="avatar" aria-label="Profile"><UserRound/></Link></div></header>}
