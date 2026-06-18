import { Transaction } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (v: Transaction) => void;
}

export default function AddTransactionModal({
  visible,
  onClose,
  onAdd,
}: AddTransactionModalProps) {
  const [transactionType, setTransactionType] = useState("expense"); // 'expense' or 'income'
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const categories: { [key: string]: string[] } = {
    expense: [
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Health",
      "Bills",
      "Other",
    ],
    income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  };

  const handleSubmit = () => {
    if (!amount || !title || !category) {
      alert("Please fill in all required fields");
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount:
        transactionType === "expense"
          ? -parseFloat(amount)
          : parseFloat(amount),
      date,
      category,
      note,
    };

    onAdd(transaction);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
    setTitle("");
    setCategory("");
    setNote("");
    setTransactionType("expense");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-slate-900 rounded-t-3xl h-5/6">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-slate-800">
              <Text className="text-white text-2xl font-bold">
                Add Transaction
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center"
              >
                <Feather name="x" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
            >
              {/* Transaction Type Toggle */}
              <View className="my-6">
                <Text className="text-slate-400 text-sm mb-3">
                  Transaction Type
                </Text>
                <View className="flex-row bg-slate-800/50 rounded-2xl p-1">
                  <TouchableOpacity
                    onPress={() => setTransactionType("expense")}
                    className={`flex-1 py-3 rounded-xl ${
                      transactionType === "expense"
                        ? "bg-red-500"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        transactionType === "expense"
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Expense
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTransactionType("income");
                      setCategory("");
                    }}
                    className={`flex-1 py-3 rounded-xl ${
                      transactionType === "income"
                        ? "bg-green-500"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        transactionType === "income"
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Income
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Amount Input */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-3">Amount *</Text>
                <View className="bg-slate-800/50 rounded-2xl px-4 py-4 flex-row items-center border border-slate-700">
                  <Text className="text-slate-400 text-2xl mr-2">$</Text>
                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0.00"
                    placeholderTextColor="#475569"
                    keyboardType="decimal-pad"
                    className="flex-1 text-white text-2xl font-semibold"
                  />
                </View>
              </View>

              {/* Title Input */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-3">Title *</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Grocery Shopping"
                  placeholderTextColor="#475569"
                  className="bg-slate-800/50 rounded-2xl px-4 py-4 text-white text-base border border-slate-700"
                />
              </View>

              {/* Category Selection */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-3">Category *</Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories[transactionType].map((cat: string) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={`px-4 py-3 rounded-xl border ${
                        category === cat
                          ? transactionType === "expense"
                            ? "bg-red-500/20 border-red-500"
                            : "bg-green-500/20 border-green-500"
                          : "bg-slate-800/50 border-slate-700"
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          category === cat ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date Input */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-3">Date</Text>
                <TextInput
                  value={date}
                  onChangeText={setDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#475569"
                  className="bg-slate-800/50 rounded-2xl px-4 py-4 text-white text-base border border-slate-700"
                />
              </View>

              {/* Notes Input */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-3">
                  Notes (Optional)
                </Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Add any additional details..."
                  placeholderTextColor="#475569"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="bg-slate-800/50 rounded-2xl px-4 py-4 text-white text-base border border-slate-700"
                />
              </View>

              <View className="h-24" />
            </ScrollView>

            {/* Submit Button */}
            <View className="px-6 py-4 border-t border-slate-800">
              <TouchableOpacity
                onPress={handleSubmit}
                className={`rounded-2xl py-4 ${
                  transactionType === "expense" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                <Text className="text-white text-center font-bold text-base">
                  Add {transactionType === "expense" ? "Expense" : "Income"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
