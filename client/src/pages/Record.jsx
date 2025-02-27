import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

export default function Component() {
  const navigate = useNavigate();

  return <div className="min-h-screen ">This is record page</div>;
}
