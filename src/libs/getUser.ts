"use client";

export default function getUser() {
  return JSON.parse(window.localStorage.getItem("user")) || null;
}
