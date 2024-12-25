import React from 'react';
import { User, KeyRound } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../types/auth';

interface UserInfoCardProps {
  userInfo: UserInfo;
}

export function UserInfoCard({ userInfo }: UserInfoCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">个人信息</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">账号</p>
            <p className="text-gray-900">{userInfo.phone}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <p className="text-sm text-gray-500">会员等级</p>
            <p className="text-gray-900">{userInfo.member_level}</p>
          </div>
        </div>
        <Button 
          variant="secondary"
          onClick={() => navigate('/settings/password')}
          className="w-full mt-4"
        >
          <KeyRound className="h-4 w-4 mr-2" />
          重置密码
        </Button>
      </div>
    </div>
  );
}