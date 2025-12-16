"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Eye,
  Edit,
  TrendingUp,
  Trash2,
  Search,
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { mockTenders, type Tender } from "@/lib/mock-data";

const getPseudoRandomNumber = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const normalized = (Math.abs(hash) % 10000) / 10000;
  return Math.floor(normalized * (max - min + 1)) + min;
};

export default function PublisherDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tenders, setTenders] = useState(() => [
    ...mockTenders,
    {
      id: "TND-2024-006",
      title: "School Renovation Project - Phase 1",
      publisher: mockTenders[0].publisher,
      category: "Construction",
      deadline: "2025-01-15",
      status: "Draft" as const,
      description:
        "Renovation of primary school buildings including classrooms, library, and administrative offices.",
      publishedDate: "2024-12-01",
      budget: "$500,000 - $750,000",
      type: "Public" as const,
      location: "Matara, Sri Lanka",
      sector: "Government" as const,
    },
    {
      id: "TND-2024-007",
      title: "Digital Transformation Initiative",
      publisher: mockTenders[0].publisher,
      category: "IT & Technology",
      deadline: "2025-02-01",
      status: "Draft" as const,
      description:
        "Implementation of digital systems for government services including website development and mobile app.",
      publishedDate: "2024-12-05",
      budget: "$1,200,000",
      type: "Public" as const,
      location: "Colombo, Sri Lanka",
      sector: "Government" as const,
    },
  ]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTender, setEditingTender] = useState<Tender | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    deadline: "",
    status: "Draft",
    budget: "",
    location: "",
    type: "Public",
    description: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tenderToDelete, setTenderToDelete] = useState<Tender | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // Filter tenders based on search and status
  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tender.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: tenders.length,
    active: tenders.filter((t) => t.status === "Active").length,
    draft: tenders.filter((t) => t.status === "Draft").length,
    totalViews: tenders.reduce(
      (sum, t) => sum + getPseudoRandomNumber(t.id + "views", 100, 1100),
      0
    ),
  };

  const handleEditTender = (tender: Tender) => {
    setEditingTender(tender);
    setEditForm({
      title: tender.title,
      category: tender.category,
      deadline: tender.deadline,
      status: tender.status,
      budget: tender.budget ?? "",
      location: tender.location ?? "",
      type: tender.type,
      description: tender.description,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingTender) {
      return;
    }
    setTenders((prev) =>
      prev.map((tender) =>
        tender.id === editingTender.id
          ? {
              ...tender,
              title: editForm.title,
              category: editForm.category,
              deadline: editForm.deadline,
              status: editForm.status as Tender["status"],
              budget: editForm.budget.trim() ? editForm.budget : undefined,
              location: editForm.location.trim() ? editForm.location : undefined,
              type: editForm.type as Tender["type"],
              description: editForm.description,
            }
          : tender
      )
    );
    setEditDialogOpen(false);
    setEditingTender(null);
  };

  const handleRequestDelete = (tender: Tender) => {
    setTenderToDelete(tender);
    setDeleteConfirmation("");
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!tenderToDelete || deleteConfirmation !== "apply delete for this tender") {
      return;
    }
    setTenders((prev) => prev.filter((tender) => tender.id !== tenderToDelete.id));
    setDeleteDialogOpen(false);
    setTenderToDelete(null);
    setDeleteConfirmation("");
  };

  const statCards = [
    {
      label: "Total Tenders",
      value: stats.total,
      icon: Calendar,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Tenders",
      value: stats.active,
      icon: TrendingUp,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <>
      <SiteHeader variant="page" />

      <main className="flex-1 bg-[#f7f9fc] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            <motion.h1
              className="text-4xl font-bold text-slate-900 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Publisher Dashboard
            </motion.h1>
            <motion.p
              className="text-slate-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              Manage your tenders and track their performance
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="shadow-sm border-0 bg-white/90 backdrop-blur-sm"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">{stat.label}</p>
                        <p className="text-3xl font-semibold text-slate-900 mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}
                      >
                        <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Actions Bar */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search tenders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-full bg-white border-slate-200 shadow-sm"
                />
              </div>
            </div>
          <div className="flex gap-3 flex-wrap justify-end md:justify-start">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 h-12 rounded-full border border-slate-200 text-sm text-slate-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[150px] w-full md:w-auto"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
              <Link href="/publisher/tenders/new" className="hidden md:block">
                <Button className="h-12 rounded-full px-5 shadow-md w-full justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Tender
                </Button>
              </Link>
              <div className="flex w-full items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 md:hidden">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Publish new tenders from a desktop device.</span>
              </div>
            </div>
          </motion.div>

          {/* Tenders Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/95 shadow-sm border-0">
              <CardContent className="p-0">
                {filteredTenders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Tender Details
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Published
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Deadline
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Performance
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {filteredTenders.map((tender, index) => (
                          <motion.tr
                            key={tender.id}
                  className="hover:bg-slate-50 transition-colors"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.3 }}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  {tender.title}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                                  <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">
                                    {tender.category}
                                  </Badge>
                                  {tender.budget && (
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="h-3 w-3" />
                                      <span>{tender.budget}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                className={`${"border-0"} ${tender.status === "Active"
                                    ? "bg-green-50 text-green-700"
                                    : tender.status === "Draft"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-slate-50 text-slate-700"
                                  }`}
                              >
                                {tender.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {tender.status === "Draft" ? (
                                <span className="text-slate-400">Not published</span>
                              ) : (
                                new Date(tender.publishedDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {tender.status === "Draft" ? (
                                <span className="text-slate-400">TBD</span>
                              ) : (
                                new Date(tender.deadline).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {tender.status === "Draft" ? (
                                <span className="text-slate-400 text-sm">No data available</span>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Eye className="h-3 w-3 text-slate-400" />
                                    <span className="text-slate-700">
                                      {getPseudoRandomNumber(tender.id + "views", 100, 1100)} views
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-3 w-3 text-slate-400" />
                                    <span className="text-slate-700">
                                      {getPseudoRandomNumber(tender.id + "interested", 5, 55)} interested
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-wrap items-center gap-2 justify-end xl:justify-start">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-9 px-4 rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 w-full sm:w-auto justify-center"
                                  aria-label="Edit tender"
                                  type="button"
                                  onClick={() => handleEditTender(tender)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-9 px-4 rounded-full bg-red-50 text-red-600 hover:bg-red-100 w-full sm:w-auto justify-center"
                                  aria-label="Delete tender"
                                  type="button"
                                  onClick={() => handleRequestDelete(tender)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No tenders found
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {searchQuery || statusFilter !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "Get started by creating your first tender"}
                    </p>
                    {!searchQuery && statusFilter === "all" && (
                      <Link href="/publisher/tenders/new">
                        <Button className="rounded-full px-5">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Tender
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) {
            setEditingTender(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Edit tender</h3>
              <p className="text-sm text-slate-500 mt-1">
                Update the tender details and save your changes.
              </p>
            </div>
            <DialogClose asChild>
              <button
                className="text-slate-400 hover:text-slate-600 transition"
                aria-label="Close edit dialog"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </DialogClose>
          </div>

          {editingTender && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editForm.title}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editForm.category}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-deadline">Deadline</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={editForm.deadline}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, deadline: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-budget">Budget</Label>
                  <Input
                    id="edit-budget"
                    value={editForm.budget}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, budget: e.target.value }))}
                    className="mt-1"
                    placeholder="$1,000,000"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editForm.location}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="mt-1"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Tender Type</Label>
                  <select
                    id="edit-type"
                    value={editForm.type}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={4}
                  value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveEdit}>
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setTenderToDelete(null);
            setDeleteConfirmation("");
          }
        }}
      >
        <DialogContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Delete tender</h3>
              <p className="text-sm text-slate-500 mt-1">
                This action cannot be undone. Please type{" "}
                <span className="font-semibold text-slate-700">
                  &quot;apply delete for this tender&quot;
                </span>{" "}
                to confirm deleting{" "}
                <span className="font-semibold">
                  {tenderToDelete ? tenderToDelete.title : "this tender"}
                </span>
                .
              </p>
            </div>
            <div>
              <Label htmlFor="delete-confirmation">Confirmation text</Label>
              <Input
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="mt-1"
                placeholder="apply delete for this tender"
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                type="button"
                disabled={deleteConfirmation !== "apply delete for this tender"}
                onClick={handleConfirmDelete}
              >
                Delete tender
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </>
  );
}
