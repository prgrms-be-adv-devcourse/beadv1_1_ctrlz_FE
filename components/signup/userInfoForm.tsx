"use client"
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserInfoFormSchema } from '@/types/userTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoFormSchema } from '@/lib/formSchema';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { findAddress } from '@/lib/address';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { signUp } from '@/services/signup';
import { useAuthStore } from '@/store/authStore';
type Props = {
  email: string
}

const UserInfoForm = ({email}: Props) => {
  
  const [isFetching, setFetching] = useState<boolean>(false);
  const { checkAuth } = useAuthStore();
  const form = useForm<UserInfoFormSchema>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: {
      email: email,
      phoneNumber: "",
      street: "",
      zipCode: "",
      state: "",
      city: "",
      details: "",
      name: "",
      nickname: "",
      oauthId: "google",
      age: 0,
    },
  });
  
  const setAddress = async () => {
    try {
      const result = await findAddress();
      

      form.setValue("zipCode", result.postCode);
      form.setValue("street", result.address);
      form.setValue("city", result.city);
      form.setValue("state", result.state);

    } catch (error) {
      alert("주소 검색을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      console.error(error);
    }
  }

  const onSubmit = async (data: UserInfoFormSchema) => {
    console.log("signup form data:", data);
    if(isFetching) return;
    //서버 연동.
    try {
      setFetching(true);
      const res = await signUp(data);
      checkAuth();
      alert('저장했습니다.')

      //메인화면으로 리다이렉트
      window.location.href = "/";
    } catch (err) {
      alert(err);
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {/* 이름 / 나이 / 성별 */}
                <tr className="border-b align-top">
                  <th className="w-32 px-4 py-5 text-left text-sm font-medium text-gray-700">
                    기본 정보
                  </th>
                  <td className="px-4 py-5">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {/* 이름 */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="sr-only">이름</FormLabel>
                            <FormControl>
                              <Input placeholder="이름" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 나이 */}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => {
                          const currentYear = new Date().getFullYear();

                          // 만 14세 이상 → 출생 연도는 (현재 연도 - 14) 이하
                          const maxBirthYear = currentYear - 14;
                          const minBirthYear = 1900;

                          const years = Array.from(
                            { length: maxBirthYear - minBirthYear + 1 },
                            (_, i) => maxBirthYear - i
                          );
                          return (
                            <FormItem className="space-y-2">
                              <FormLabel className="sr-only">출생 연도</FormLabel>
                              <FormControl>
                                <Select
                                  value={
                                    field.value
                                      ? String(new Date().getFullYear() - field.value + 1)
                                      : undefined
                                  }
                                  onValueChange={(value) => {
                                    const currentYear = new Date().getFullYear();
                                    const birthYear = Number(value);
                                
                                    // 연도 → 나이(number)
                                    const age = currentYear - birthYear + 1;
                                
                                    field.onChange(age);
                                  }}
                                >
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="출생 연도 선택" />
                                  </SelectTrigger>
                                  <SelectContent
                                    position="popper"
                                    className="bg-white"
                                  >
                                    {years.map((year) => (
                                      <SelectItem key={year} value={String(year)}>
                                        {year}년
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/* 성별 */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="sr-only">성별</FormLabel>
                            <FormControl>
                              <div className="flex h-10 gap-2">
                                <Button
                                  type="button"
                                  variant={field.value === "male" ? "default" : "outline"}
                                  className={`flex-1 ${
                                    field.value === "male"
                                      ? "bg-[#A57C76] text-white hover:bg-[#8f6964]"
                                      : "border-gray-300 text-gray-700"
                                  }`}
                                  onClick={() => field.onChange("male")}
                                >
                                  남
                                </Button>
                                <Button
                                  type="button"
                                  variant={field.value === "female" ? "default" : "outline"}
                                  className={`flex-1 ${
                                    field.value === "female"
                                      ? "bg-[#A57C76] text-white hover:bg-[#8f6964]"
                                      : "border-gray-300 text-gray-700"
                                  }`}
                                  onClick={() => field.onChange("female")}
                                >
                                  여
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </td>
                </tr>

                {/* 이메일 */}
                <tr className="border-b align-top">
                  <th className="px-4 py-5 text-left text-sm font-medium text-gray-700">
                    이메일
                  </th>
                  <td className="px-4 py-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="h-11"
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>

                {/* 전화번호 */}
                <tr className="border-b align-top">
                  <th className="px-4 py-5 text-left text-sm font-medium text-gray-700">
                    전화번호
                  </th>
                  <td className="px-4 py-5">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>

                {/* 닉네임 */}
                <tr className="border-b align-top">
                  <th className="px-4 py-5 text-left text-sm font-medium text-gray-700">
                    닉네임
                  </th>
                  <td className="px-4 py-5">
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>

                {/* 주소 */}
                <tr className="border-b align-top">
                  <th className="px-4 py-5 text-left text-sm font-medium text-gray-700">
                    주소
                  </th>
                  <td className="px-4 py-5 space-y-4">
                    {/* 우편번호 */}
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <div className="flex gap-2">
                              <Input {...field} readOnly placeholder="우편번호" />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAddress()}
                              >
                                주소 찾기
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* 도로명 */}
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input {...field} readOnly placeholder="도로명 주소" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* 도시 / 구군 */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormControl>
                              <Input {...field} readOnly placeholder="도시" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormControl>
                              <Input {...field} readOnly placeholder="구 / 군" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* 상세 주소 */}
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input {...field} placeholder="상세 주소" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#A57C76] py-3 text-base font-semibold text-[#F9F6F3] hover:bg-[#8f6964]"
          >
            저장하기
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UserInfoForm
