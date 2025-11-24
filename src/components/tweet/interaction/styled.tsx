import styled from "styled-components";

export const InteractionWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 10px;
  &.like {
    margin-right: auto;
    padding: 0 40px 0 2px;
  }
  &.bookmark {
    padding: 0 2px 0 40px;
  }
  &:hover {
    svg > g > path {
      transition: 0.15s all;
    }

    svg.liked > g > path {
      color: var(--like-hover-liked);
    }
    svg.not_liked > g > path {
      color: var(--like-hover-not-liked);
    }

    svg.bookmarked > g > path {
      color: var(--bookmark-hover-liked);
    }
    svg.not_bookmarked > g > path {
      color: var(--bookmark-hover-not-liked);
    }
  }
`;

export const InteractionButton = styled.label`
  width: var(--like-size);
  height: var(--like-size);
  cursor: pointer;
`;

export const InteractionSVGOuter = styled.svg`
  position: absolute;
  height: var(--like-size);
  width: var(--like-size);

  &.liked > g > path {
    color: var(--like-outer-liked);
  }
  &.not_liked > g > path {
    color: var(--like-outer-not-liked);
  }

  &.bookmarked > g > path {
    color: var(--bookmark-outer-liked);
  }
  &.not_bookmarked > g > path {
    color: var(--bookmark-outer-not-liked);
  }
`;

export const InteractionSVGInner = styled.svg`
  position: absolute;
  height: var(--like-size);
  width: var(--like-size);

  &.liked > g > path {
    color: var(--like-inner-liked);
  }
  &.not_liked > g > path {
    color: var(--like-inner-not-liked);
  }

  &.bookmarked > g > path {
    color: var(--bookmark-inner-liked);
  }
  &.not_bookmarked > g > path {
    color: var(--bookmark-inner-not-liked);
  }
`;

export const InteractionCount = styled.span`
  font-size: 20px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
