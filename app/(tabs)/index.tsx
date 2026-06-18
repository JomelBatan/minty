import { Transaction } from "@/types";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Store",
    category: "Food",
    amount: -1200,
    type: "expense",
    date: "Dec 28",
  },
  {
    id: "2",
    title: "Salary",
    category: "Income",
    amount: 25000,
    type: "income",
    date: "Dec 27",
  },
  {
    id: "3",
    title: "Electric Bill",
    category: "Utilities",
    amount: -1800,
    type: "expense",
    date: "Dec 26",
  },
];

export default function HomeScreen() {
  const balance = 22000;

  const renderItem = ({ item }: { item: Transaction }) => {
    const isIncome = item.type === "income";

    return (
      <View className="flex-row items-center justify-between rounded-2xl bg-white p-4 mb-3 shadow-sm">
        <View>
          <Text className="text-base font-semibold text-gray-900">
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500">
            {item.category} • {item.date}
          </Text>
        </View>

        <Text
          className={`text-base font-semibold ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}₱{Math.abs(item.amount).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-5 pt-4 pb-6">
        <Text className="text-sm text-gray-500">Current Balance</Text>
        <Text className="text-3xl font-bold text-gray-900 mt-1">
          ₱{balance.toLocaleString()}
        </Text>
      </View>

      {/* Balance Card */}
      <View className="mx-5 mb-6 rounded-3xl bg-[#1E293B] p-6">
        <Text className="text-gray-300 text-sm">Available Balance</Text>
        <Text className="text-white text-3xl font-bold mt-2">
          ₱{balance.toLocaleString()}
        </Text>

        <View className="flex-row justify-between mt-6">
          <View>
            <Text className="text-gray-400 text-xs">Income</Text>
            <Text className="text-green-400 font-semibold mt-1">₱25,000</Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">Expenses</Text>
            <Text className="text-red-400 font-semibold mt-1">₱3,000</Text>
          </View>
        </View>
      </View>

      {/* Transactions */}
      <View className="flex-1 px-5">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
