import AddTransactionModal from "@/components/AddTransactionModal";
import { Transaction } from "@/types";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExpenseTrackerHome() {
  const [username] = useState("Alexander");
  const [balance] = useState(12847.52);
  const [modalVisible, setModalVisible] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Salary Deposit",
      amount: 5500.0,
      date: "2024-12-27",
      type: "income",
      category: "Income",
    },
    {
      id: "2",
      title: "Grocery Shopping",
      amount: -156.3,
      date: "2024-12-26",
      type: "expense",
      category: "Food",
    },
    {
      id: "3",
      title: "Netflix Subscription",
      amount: -15.99,
      date: "2024-12-25",
      type: "expense",
      category: "Entertainment",
    },
    {
      id: "4",
      title: "Freelance Project",
      amount: 850.0,
      date: "2024-12-24",
      type: "income",
      category: "Income",
    },
    {
      id: "5",
      title: "Uber Ride",
      amount: -24.5,
      date: "2024-12-24",
      type: "expense",
      category: "Transport",
    },
    {
      id: "6",
      title: "Restaurant Dinner",
      amount: -89.99,
      date: "2024-12-23",
      type: "expense",
      category: "Food",
    },
    {
      id: "7",
      title: "Amazon Purchase",
      amount: -234.99,
      date: "2024-12-22",
      type: "expense",
      category: "Shopping",
    },
    {
      id: "8",
      title: "Gym Membership",
      amount: -49.99,
      date: "2024-12-20",
      type: "expense",
      category: "Health",
    },
  ]);
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Income: "trending-up",
      Food: "shopping-bag",
      Entertainment: "film",
      Transport: "truck",
      Shopping: "shopping-cart",
      Health: "heart",
    };

    return icons[category] || ("circle" as any);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        className="pt-14 pb-8 px-6"
      >
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-slate-400 text-sm mb-1">Welcome back,</Text>
            <Text className="text-white text-2xl font-bold">{username}</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 rounded-full bg-slate-800/50 items-center justify-center border border-slate-700">
            <Feather name="bell" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-6 shadow-2xl border border-blue-500/20">
          <View className="flex-row items-center mb-2">
            <Feather name="eye" size={16} color="rgba(255,255,255,0.7)" />
            <Text className="text-white/70 text-sm ml-2">Total Balance</Text>
          </View>
          <Text className="text-white text-4xl font-bold mb-4">
            $
            {balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>

          <View className="flex-row justify-between items-center pt-4 border-t border-white/20">
            <View>
              <Text className="text-white/60 text-xs mb-1">Income</Text>
              <Text className="text-white text-base font-semibold">
                +$6,350.00
              </Text>
            </View>
            <View className="h-8 w-px bg-white/20" />
            <View>
              <Text className="text-white/60 text-xs mb-1">Expenses</Text>
              <Text className="text-white text-base font-semibold">
                -$571.76
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Add Transaction Button */}
      <View className="px-6 -mt-6 mb-4">
        <TouchableOpacity className="bg-blue-600 rounded-2xl py-4 flex-row items-center justify-center shadow-lg">
          <Feather name="plus" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-2">
            Add Transaction
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions Section */}
      <View className="flex-1 px-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-xl font-bold">
            Recent Transactions
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-400 text-sm font-medium">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-3 flex-row items-center"
            >
              <View
                className={`w-12 h-12 rounded-xl items-center justify-center ${
                  transaction.type === "income"
                    ? "bg-green-500/10"
                    : "bg-red-500/10"
                }`}
              >
                <Feather
                  name={getCategoryIcon(transaction.category)}
                  size={20}
                  color={transaction.type === "income" ? "#10b981" : "#ef4444"}
                />
              </View>

              <View className="flex-1 ml-4">
                <Text className="text-white font-semibold text-base mb-1">
                  {transaction.title}
                </Text>
                <Text className="text-slate-500 text-sm">
                  {formatDate(transaction.date)}
                </Text>
              </View>

              <Text
                className={`font-bold text-lg ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : ""}$
                {Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}

          <View className="h-8" />
        </ScrollView>
      </View>
      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTransaction}
      />
    </View>
  );
}
