import { Sectiontitle } from "@/components/ui/sectionTitle";
import { userInfoFormSchema } from "@/lib/formSchema";
import UserInfoForm from "@/components/signup/userInfoForm";
import React from "react";
import { TUserInfoQueryParams } from "@/types/userTypes";

type Props = {
  searchParams: Promise<TUserInfoQueryParams>
}

const Signup = ({searchParams}: Props) => {

  const params = React.use(searchParams);

  return (
    <div className="m-auto mt-20 w-full max-w-[600px] px-4">
      <Sectiontitle>추가 정보 입력</Sectiontitle>
      <UserInfoForm email={params.email} />
    </div>
  );
};

export default Signup;
