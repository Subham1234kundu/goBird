"use client";

import { useState, useEffect } from "react";

interface DateRangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (startDate: Date | null, endDate: Date | null) => void;
    initialStartDate?: Date | null;
    initialEndDate?: Date | null;
}

export default function DateRangeModal({ isOpen, onClose, onApply, initialStartDate = null, initialEndDate = null }: DateRangeModalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

    useEffect(() => {
        if (isOpen) {
            setStartDate(initialStartDate);
            setEndDate(initialEndDate);
            setCurrentMonth(initialStartDate || new Date());
        }
    }, [isOpen, initialStartDate, initialEndDate]);

    if (!isOpen) return null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day: number) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        if (!startDate || (startDate && endDate)) {
            // Start new selection
            setStartDate(selectedDate);
            setEndDate(null);
        } else {
            // Set end date
            if (selectedDate < startDate) {
                setEndDate(startDate);
                setStartDate(selectedDate);
            } else {
                setEndDate(selectedDate);
            }
        }
    };

    const isDateInRange = (day: number) => {
        if (!startDate) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        if (!endDate) {
            return date.toDateString() === startDate.toDateString();
        }

        return date >= startDate && date <= endDate;
    };

    const isStartOrEndDate = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return (startDate && date.toDateString() === startDate.toDateString()) ||
            (endDate && date.toDateString() === endDate.toDateString());
    };

    const handleApply = () => {
        onApply(startDate, endDate);
        onClose();
    };

    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        onApply(null, null);
        onClose();
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -startingDayOfWeek + i + 1);
        days.push(
            <div key={`empty-${i}`} className="text-center py-2 text-gray-300">
                {prevMonthDate.getDate()}
            </div>
        );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const inRange = isDateInRange(day);
        const isEdge = isStartOrEndDate(day);

        days.push(
            <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`text-center py-2 rounded-lg transition-colors ${isEdge
                        ? "bg-[#FE4B00] text-white font-semibold"
                        : inRange
                            ? "bg-orange-100 text-[#FE4B00]"
                            : "text-[#3D3D3D] hover:bg-gray-100"
                    }`}
            >
                {day}
            </button>
        );
    }

    // Add empty cells for days after the month ends
    const remainingCells = 7 - (days.length % 7);
    if (remainingCells < 7) {
        for (let i = 1; i <= remainingCells; i++) {
            days.push(
                <div key={`next-${i}`} className="text-center py-2 text-gray-300">
                    {i}
                </div>
            );
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-xl w-[380px] p-6 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={handlePreviousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold text-[#3D3D3D]">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h3>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day, index) => (
                            <div key={index} className="text-center text-sm font-medium text-gray-400">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {days}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleClear}
                            className="flex-1 rounded-lg border border-[#E4E4E4] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D3D] hover:bg-gray-50 transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleApply}
                            disabled={!startDate}
                            className="flex-1 rounded-lg bg-[#FE4B00] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#E54300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
