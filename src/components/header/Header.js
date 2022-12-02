import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../../assets/Peer Streams.png";
import connectwallet from "../../assets/connect wallet.png";
import "./style.css";
import Auth from "../../context/Auth";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: Squares2X2Icon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: LifebuoyIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  
  const { audio } = useContext(Auth);

  return (
    <Popover className="relative header">
      <div className="mx-auto max-w-10xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="sr-only">Your Company</span>
            <img className="h-10 w-auto sm:h-16" src={logo} alt="" />
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Link to="/"><a
              href="#"
              className="text-base font-medium text-white button-hover"
              onClick={() => {
                audio.play();
              }}
            >
              Home
            </a></Link> 
            <a
              href="#"
              className="text-base font-medium text-white button-hover"
              onClick={() => {
                audio.play();
              }}
            >
              Monetization
            </a>
            <a
              href="#"
              className="text-base font-medium text-white button-hover"
              onClick={() => {
                audio.play();
              }}
            >
              How To Use
            </a>
            <Link to="/"><a
              href="#"
              className="text-base font-medium text-white button-hover"
              onClick={() => {
                audio.play();
              }}
            >
              Create Channel
            </a></Link> 
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {/* <a
              onClick={() => {
                audio.play();
              }}
              href="#"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent"
            >
              <img
                src={connectwallet}
                alt=""
                className="w-72 h-10 object-cover"
              />
            </a> */}
            <ConnectButton />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
