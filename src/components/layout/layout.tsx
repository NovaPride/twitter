import { Outlet } from "react-router-dom";

import { Navigation } from "@/components/navigation/navigation";
import { MobileSearchSidebar } from "@/components/search-sidebar/mobile-search-sidebar";
import { SearchSidebar } from "@/components/search-sidebar/search-sidebar";

import {
  Background,
  ContentWrapper,
  NavigationDesktopWrapper,
  NavigationWrapper,
  ProfileWrapper,
  SearchDesktopWrapper,
  SearchMobileWrapper,
  SearchWrapper,
} from "./styled";

export function Layout() {
  return (
    <>
      <ProfileWrapper>
        <div className="gridInterface">
          <NavigationWrapper>
            <NavigationDesktopWrapper>
              <Navigation />
            </NavigationDesktopWrapper>
          </NavigationWrapper>
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
          <SearchWrapper>
            <SearchMobileWrapper>
              <MobileSearchSidebar />
            </SearchMobileWrapper>
            <SearchDesktopWrapper>
              <SearchSidebar />
            </SearchDesktopWrapper>
          </SearchWrapper>
        </div>
      </ProfileWrapper>
      <Background />
    </>
  );
}
