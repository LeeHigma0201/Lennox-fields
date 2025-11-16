'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  User,
  Clock,
  FileText,
  Download,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Briefcase,
  HelpCircle,
} from 'lucide-react';

// Types for supervision session
interface SupervisionSession {
  id: string;
  date: string;
  supervisorName: string;
  type: 'individual' | 'group';
  duration: number; // in hours
  topicsDiscussed: string[];
  skillsPracticed: string[];
  notes: string;
  competenciesAddressed?: string[];
  ethicalDilemmas?: string;
  casesSeen?: number;
}

interface LicensureRequirements {
  state: string;
  individualHours: number;
  groupHours: number;
  totalHours: number;
  notes: string;
}

const SupervisionTracker: React.FC = () => {
  const [sessions, setSessions] = useState<SupervisionSession[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    date: '',
    supervisorName: '',
    type: 'individual' as 'individual' | 'group',
    duration: '',
    topicsDiscussed: '',
    skillsPracticed: '',
    notes: '',
    competenciesAddressed: '',
    ethicalDilemmas: '',
    casesSeen: '',
  });

  // NC and IN Licensure Requirements
  const licensureRequirements: LicensureRequirements[] = [
    {
      state: 'North Carolina (LPCA → LPC)',
      individualHours: 100,
      groupHours: 50,
      totalHours: 100, // Individual supervision required, group can supplement
      notes:
        'At least 100 hours of face-to-face individual clinical supervision. Up to 50 additional hours may be group supervision.',
    },
    {
      state: 'Indiana (LPCA → LPC)',
      individualHours: 60,
      groupHours: 40,
      totalHours: 100,
      notes:
        'At least 60 hours of individual supervision and 40 hours of group supervision (or alternative supervised experience). Supervision must be by licensed mental health professional.',
    },
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('supervisionSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    setLoading(false);
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('supervisionSessions', JSON.stringify(sessions));
    }
  }, [sessions, loading]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSession = () => {
    if (
      !formData.date ||
      !formData.supervisorName ||
      !formData.duration ||
      !formData.topicsDiscussed
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const newSession: SupervisionSession = {
      id: editingId || Date.now().toString(),
      date: formData.date,
      supervisorName: formData.supervisorName,
      type: formData.type,
      duration: parseFloat(formData.duration),
      topicsDiscussed: formData.topicsDiscussed.split(',').map((t) => t.trim()),
      skillsPracticed: formData.skillsPracticed.split(',').map((s) => s.trim()),
      notes: formData.notes,
      competenciesAddressed: formData.competenciesAddressed
        ? formData.competenciesAddressed.split(',').map((c) => c.trim())
        : undefined,
      ethicalDilemmas: formData.ethicalDilemmas || undefined,
      casesSeen: formData.casesSeen ? parseInt(formData.casesSeen) : undefined,
    };

    if (editingId) {
      setSessions(sessions.map((s) => (s.id === editingId ? newSession : s)));
      setEditingId(null);
    } else {
      setSessions([...sessions, newSession]);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      date: '',
      supervisorName: '',
      type: 'individual',
      duration: '',
      topicsDiscussed: '',
      skillsPracticed: '',
      notes: '',
      competenciesAddressed: '',
      ethicalDilemmas: '',
      casesSeen: '',
    });
  };

  const handleEdit = (session: SupervisionSession) => {
    setFormData({
      date: session.date,
      supervisorName: session.supervisorName,
      type: session.type,
      duration: session.duration.toString(),
      topicsDiscussed: session.topicsDiscussed.join(', '),
      skillsPracticed: session.skillsPracticed.join(', '),
      notes: session.notes,
      competenciesAddressed:
        session.competenciesAddressed?.join(', ') || '',
      ethicalDilemmas: session.ethicalDilemmas || '',
      casesSeen: session.casesSeen?.toString() || '',
    });
    setEditingId(session.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this supervision session?'
      )
    ) {
      setSessions(sessions.filter((s) => s.id !== id));
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const individual = sessions
      .filter((s) => s.type === 'individual')
      .reduce((sum, s) => sum + s.duration, 0);
    const group = sessions
      .filter((s) => s.type === 'group')
      .reduce((sum, s) => sum + s.duration, 0);
    return {
      individual: parseFloat(individual.toFixed(2)),
      group: parseFloat(group.toFixed(2)),
      total: parseFloat((individual + group).toFixed(2)),
    };
  };

  const totals = calculateTotals();

  // Calculate progress
  const calculateProgress = (
    req: LicensureRequirements
  ): {
    individualProgress: number;
    groupProgress: number;
    totalProgress: number;
    metIndividual: boolean;
    metGroup: boolean;
    metTotal: boolean;
  } => {
    const metIndividual = totals.individual >= req.individualHours;
    const metGroup = totals.group >= req.groupHours;
    const metTotal = totals.total >= req.totalHours;

    return {
      individualProgress: Math.min(
        (totals.individual / req.individualHours) * 100,
        100
      ),
      groupProgress: Math.min((totals.group / req.groupHours) * 100, 100),
      totalProgress: Math.min(
        (totals.total / req.totalHours) * 100,
        100
      ),
      metIndividual,
      metGroup,
      metTotal,
    };
  };

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Supervisor',
      'Type',
      'Duration (hours)',
      'Topics Discussed',
      'Skills Practiced',
      'Competencies Addressed',
      'Ethical Dilemmas',
      'Cases Seen',
      'Notes',
    ];

    const rows = sessions.map((s) => [
      s.date,
      s.supervisorName,
      s.type,
      s.duration,
      s.topicsDiscussed.join('; '),
      s.skillsPracticed.join('; '),
      s.competenciesAddressed?.join('; ') || '',
      s.ethicalDilemmas || '',
      s.casesSeen || '',
      s.notes,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `supervision-log-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToPDF = () => {
    // Using a simple HTML-based PDF approach
    const htmlContent = `
      <html>
        <head>
          <title>Clinical Supervision Log</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1f2937; }
            h2 { color: #4b5563; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; }
            .summary { background-color: #f0fdf4; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .summary-item { margin: 5px 0; }
            .disclaimer { background-color: #fef2f2; padding: 15px; margin: 20px 0; border-radius: 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Clinical Supervision Log</h1>
          <p>Exported: ${new Date().toLocaleDateString()}</p>

          <div class="summary">
            <h2>Summary</h2>
            <div class="summary-item"><strong>Individual Supervision Hours:</strong> ${totals.individual.toFixed(2)}</div>
            <div class="summary-item"><strong>Group Supervision Hours:</strong> ${totals.group.toFixed(2)}</div>
            <div class="summary-item"><strong>Total Hours:</strong> ${totals.total.toFixed(2)}</div>
          </div>

          <h2>Supervision Sessions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Supervisor</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Topics</th>
                <th>Skills</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${sessions
                .map(
                  (s) => `
                <tr>
                  <td>${s.date}</td>
                  <td>${s.supervisorName}</td>
                  <td>${s.type}</td>
                  <td>${s.duration}h</td>
                  <td>${s.topicsDiscussed.join(', ')}</td>
                  <td>${s.skillsPracticed.join(', ')}</td>
                  <td>${s.notes}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="disclaimer">
            <p><strong>IMPORTANT DISCLAIMER:</strong> This document is for informational purposes only. It is the licensee's responsibility to verify all supervision requirements with their state licensing board. Requirements may vary and change. Always consult the current regulations from the North Carolina Board of Licensed Professional Counselors and/or the Indiana Counseling and Marriage and Family Therapy Regulatory Commission.</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=400,width=800');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase size={32} />
            <h1 className="text-4xl font-bold">Clinical Supervision Tracker</h1>
          </div>
          <p className="text-xl text-blue-100 mb-4">
            Track your path to licensure with confidence
          </p>
          <p className="text-blue-50 mb-6">
            Clinical supervision is a cornerstone of professional development in counseling. Whether you're working toward your Licensed Professional Counselor (LPC) credential, this tracker helps you document your supervision hours, competencies, and growth toward licensure in North Carolina or Indiana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Clock className="inline mb-2" size={24} />
              <p className="font-semibold">Track Hours</p>
              <p className="text-sm text-blue-100">
                Log individual and group supervision sessions
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Target className="inline mb-2" size={24} />
              <p className="font-semibold">Monitor Progress</p>
              <p className="text-sm text-blue-100">
                Watch your progress toward state requirements
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Download className="inline mb-2" size={24} />
              <p className="font-semibold">Export Records</p>
              <p className="text-sm text-blue-100">
                PDF and CSV for licensing board submission
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Important Disclaimer
              </h3>
              <p className="text-amber-800 text-sm mb-3">
                This tool is designed to help you organize and track your supervision data. However,
                <strong> it is your responsibility</strong> to verify all supervision requirements with
                your state licensing board. Supervision requirements, supervisor qualifications, and
                approved formats may change and vary by state.
              </p>
              <p className="text-amber-800 text-sm">
                Always consult the current regulations from the{' '}
                <strong>North Carolina Board of Licensed Professional Counselors</strong> (NCBLPC) or the{' '}
                <strong>Indiana Counseling and Marriage and Family Therapy Regulatory Commission</strong>{' '}
                (ICMFTRC) before submitting any documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Licensure Requirements Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Licensure Supervision Requirements
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {licensureRequirements.map((req) => (
              <div
                key={req.state}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {req.state}
                </h3>

                {/* Progress bars for this state */}
                {calculateProgress(req).metTotal ? (
                  <div className="mb-4 flex items-center gap-2 bg-green-50 p-3 rounded">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-700 font-semibold">
                      Requirements Met!
                    </span>
                  </div>
                ) : null}

                <div className="space-y-4">
                  {/* Individual Hours */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-semibold text-slate-700">
                        Individual Supervision
                      </label>
                      <span className="text-slate-600">
                        {totals.individual.toFixed(2)} / {req.individualHours}h
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          calculateProgress(req).metIndividual
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        }`}
                        style={{
                          width: `${calculateProgress(req).individualProgress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Group Hours */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-semibold text-slate-700">
                        Group Supervision
                      </label>
                      <span className="text-slate-600">
                        {totals.group.toFixed(2)} / {req.groupHours}h
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          calculateProgress(req).metGroup
                            ? 'bg-green-500'
                            : 'bg-indigo-500'
                        }`}
                        style={{
                          width: `${calculateProgress(req).groupProgress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Total Hours */}
                  <div className="bg-slate-50 p-3 rounded mt-4 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-900">
                        Total Hours
                      </label>
                      <span className="text-lg font-bold text-slate-900">
                        {totals.total.toFixed(2)} / {req.totalHours}h
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 mt-2">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          calculateProgress(req).metTotal
                            ? 'bg-green-600'
                            : 'bg-slate-600'
                        }`}
                        style={{
                          width: `${calculateProgress(req).totalProgress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 pt-3 border-t">
                    {req.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Your Supervision Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users size={32} className="mx-auto mb-2 text-blue-600" />
              <p className="text-slate-600 text-sm mb-2">Individual Hours</p>
              <p className="text-3xl font-bold text-blue-600">
                {totals.individual.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Users size={32} className="mx-auto mb-2 text-indigo-600" />
              <p className="text-slate-600 text-sm mb-2">Group Hours</p>
              <p className="text-3xl font-bold text-indigo-600">
                {totals.group.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock size={32} className="mx-auto mb-2 text-purple-600" />
              <p className="text-slate-600 text-sm mb-2">Total Hours</p>
              <p className="text-3xl font-bold text-purple-600">
                {totals.total.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <FileText size={32} className="mx-auto mb-2 text-emerald-600" />
              <p className="text-slate-600 text-sm mb-2">Sessions Logged</p>
              <p className="text-3xl font-bold text-emerald-600">
                {sessions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        {sessions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Export Your Data
            </h2>
            <p className="text-slate-600 mb-6">
              Export your supervision log to PDF or CSV format for submission to licensing boards or your
              records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={exportToPDF}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <Download size={20} />
                Export to PDF
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <Download size={20} />
                Export to CSV
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? 'Edit Supervision Session' : 'Log New Supervision Session'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date of Supervision *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Supervisor Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Supervisor Name *
                </label>
                <input
                  type="text"
                  name="supervisorName"
                  value={formData.supervisorName}
                  onChange={handleInputChange}
                  placeholder="Full name of your supervisor"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Type of Supervision *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  name="duration"
                  step="0.5"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 1.5"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Topics Discussed */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Topics Discussed * (comma-separated)
                </label>
                <textarea
                  name="topicsDiscussed"
                  value={formData.topicsDiscussed}
                  onChange={handleInputChange}
                  placeholder="e.g., Client assessment, treatment planning, therapeutic alliance"
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Skills Practiced */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Skills Practiced (comma-separated)
                </label>
                <textarea
                  name="skillsPracticed"
                  value={formData.skillsPracticed}
                  onChange={handleInputChange}
                  placeholder="e.g., Active listening, motivational interviewing, case conceptualization"
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Competencies Addressed */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Competencies Addressed (comma-separated)
                </label>
                <textarea
                  name="competenciesAddressed"
                  value={formData.competenciesAddressed}
                  onChange={handleInputChange}
                  placeholder="e.g., Cultural competence, assessment skills, diagnosis"
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ethical Dilemmas */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ethical Dilemmas or Challenges Discussed
                </label>
                <textarea
                  name="ethicalDilemmas"
                  value={formData.ethicalDilemmas}
                  onChange={handleInputChange}
                  placeholder="Describe any ethical issues or professional challenges discussed"
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cases Seen */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Clients Discussed
                </label>
                <input
                  type="number"
                  name="casesSeen"
                  value={formData.casesSeen}
                  onChange={handleInputChange}
                  placeholder="Number of cases"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notes & Reflections
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Personal reflections, key learnings, goals for next session"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddSession}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <Plus size={20} />
                {editingId ? 'Update Session' : 'Log Session'}
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-6 py-3 bg-slate-300 hover:bg-slate-400 text-slate-900 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Session Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition mb-12"
          >
            <Plus size={24} />
            Log New Supervision Session
          </button>
        )}

        {/* Supervision Sessions List */}
        {sessions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Supervision Log ({sessions.length} sessions)
            </h2>
            <div className="space-y-4">
              {[...sessions]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-300 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-slate-600" />
                            <span className="font-semibold text-slate-900">
                              {new Date(session.date).toLocaleDateString(
                                'en-US',
                                {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={18} className="text-slate-600" />
                            <span className="text-slate-900">
                              {session.supervisorName}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              session.type === 'individual'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}
                          >
                            {session.type === 'individual'
                              ? 'Individual'
                              : 'Group'}
                          </span>
                          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded">
                            <Clock size={18} className="text-purple-600" />
                            <span className="font-semibold text-purple-900">
                              {session.duration}h
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                          onClick={() => handleEdit(session)}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      {/* Topics */}
                      {session.topicsDiscussed.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <BookOpen size={16} />
                            Topics Discussed
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {session.topicsDiscussed.map((topic, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills */}
                      {session.skillsPracticed.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <Target size={16} />
                            Skills Practiced
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {session.skillsPracticed.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Competencies */}
                      {session.competenciesAddressed &&
                        session.competenciesAddressed.length > 0 && (
                          <div>
                            <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                              <CheckCircle size={16} />
                              Competencies Addressed
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {session.competenciesAddressed.map(
                                (comp, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs"
                                  >
                                    {comp}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Cases */}
                      {session.casesSeen !== undefined && (
                        <div>
                          <p className="font-semibold text-slate-700 mb-2">
                            Clients Discussed: {session.casesSeen}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Ethical Dilemmas */}
                    {session.ethicalDilemmas && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Ethical Consideration
                        </p>
                        <p className="text-slate-700 bg-amber-50 p-3 rounded">
                          {session.ethicalDilemmas}
                        </p>
                      </div>
                    )}

                    {/* Notes */}
                    {session.notes && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <FileText size={16} />
                          Notes & Reflections
                        </p>
                        <p className="text-slate-700 bg-blue-50 p-3 rounded">
                          {session.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {sessions.length === 0 && !showForm && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center mb-12">
            <BookOpen className="mx-auto mb-4 text-slate-300" size={48} />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No Supervision Sessions Yet
            </h3>
            <p className="text-slate-500 mb-6">
              Start logging your supervision sessions to track your progress toward licensure.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Plus size={20} />
              Log Your First Session
            </button>
          </div>
        )}

        {/* Tips & Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Tips for Getting Most from Supervision */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" size={28} />
              Tips for Maximizing Supervision
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Come Prepared
                  </h4>
                  <p className="text-slate-600">
                    Bring specific cases, videos, or questions to make the most of your time. Have
                    challenging client dynamics ready to discuss.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Ask for Feedback
                  </h4>
                  <p className="text-slate-600">
                    Request specific feedback on your clinical work. Ask about your strengths and
                    areas for growth.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Discuss Ethical Issues
                  </h4>
                  <p className="text-slate-600">
                    Use supervision to work through ethical dilemmas, boundary issues, and
                    professional challenges.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Track Competencies
                  </h4>
                  <p className="text-slate-600">
                    Document specific competencies you're developing—assessment, treatment
                    planning, specific modalities, cultural competence.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    5
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Reflect on Learning
                  </h4>
                  <p className="text-slate-600">
                    Take time after supervision to reflect on key learnings. Use this tracker's
                    notes field to capture insights.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    6
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Set Goals
                  </h4>
                  <p className="text-slate-600">
                    Work with your supervisor to set specific, measurable goals for clinical
                    development between sessions.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Finding a Qualified Supervisor */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="text-indigo-600" size={28} />
              Finding a Qualified Supervisor
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 text-lg">
                  Supervisor Qualifications
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-1"
                    />
                    <span>
                      Licensed mental health professional (LPC, LMFT, LCSW, psychologist)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-1"
                    />
                    <span>
                      At least 2 years of post-licensure clinical experience
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-1"
                    />
                    <span>
                      Appropriate supervision credentials/training for your state
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-1"
                    />
                    <span>Good standing with state licensing board</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3 text-lg">
                  Where to Find Supervisors
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      State licensing board referral lists (NCBLPC, ICMFTRC)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      Professional associations (ACA, AAMFT, NASW)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      Community mental health centers and clinics
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      University graduate programs and training clinics
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Personal networks and referrals from colleagues</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>
                      Professional supervision services and private practices
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-900">
                  <strong>Pro Tip:</strong> Interview potential supervisors about their approach,
                  availability, and how they structure supervision. A good fit is essential for
                  meaningful professional development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Track Beyond Hours */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What to Track Beyond Hours
          </h2>
          <p className="text-slate-600 mb-6">
            While hours are important, focus on documenting your professional growth and competency
            development. Use this tracker to record:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Competencies Developed</h4>
              <p className="text-slate-600 text-sm mb-3">
                Track specific clinical competencies you're building: assessment skills, diagnosis,
                treatment planning, specific therapeutic modalities (CBT, DBT, motivational
                interviewing), group work, crisis intervention, etc.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Developed competency in trauma-informed care and safety
                planning"
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Ethical Reasoning</h4>
              <p className="text-slate-600 text-sm mb-3">
                Document ethical dilemmas you've faced and how you worked through them with your
                supervisor. This demonstrates professional maturity and ethical development.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Discussed dual relationship concerns when former client
                requested social media connection"
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Case Complexity</h4>
              <p className="text-slate-600 text-sm mb-3">
                Note the types of cases and populations you're working with. Document exposure to
                diverse diagnoses, ages, cultural backgrounds, and clinical challenges.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Supervised work with 5 clients including PTSD, bipolar
                disorder, and substance use"
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Professional Growth</h4>
              <p className="text-slate-600 text-sm mb-3">
                Track how you're developing professionally—improved clinical intuition, increased
                confidence, better boundary setting, enhanced cultural awareness.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Felt more confident conducting initial assessments;
                supervisor validated my intake process"
              </p>
            </div>

            <div className="border-l-4 border-rose-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Feedback Received</h4>
              <p className="text-slate-600 text-sm mb-3">
                Summarize key feedback from your supervisor about your clinical work, areas of
                strength, and specific suggestions for improvement.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Work on pacing interventions; supervisor noted I
                sometimes move too quickly"
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h4 className="font-semibold text-slate-900 mb-2">Goals & Action Items</h4>
              <p className="text-slate-600 text-sm mb-3">
                Document goals set with your supervisor for the next supervision session or between
                sessions. This creates accountability and tracks your development plan.
              </p>
              <p className="text-slate-600 text-sm">
                <strong>Example:</strong> "Goal: Present a full case conceptualization at next
                supervision"
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">NC Requirements</h4>
              <p className="text-slate-200 text-sm mb-4">
                For licensure as an LPC in North Carolina, supervised clinical experience requires:
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Minimum 100 hours of face-to-face individual supervision</li>
                <li>• Up to 50 additional hours may be group supervision</li>
                <li>• Supervision by licensed mental health professional</li>
                <li>• Supervisor must have 2+ years post-licensure experience</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">IN Requirements</h4>
              <p className="text-slate-200 text-sm mb-4">
                For licensure as an LPC in Indiana, supervised experience includes:
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Minimum 60 hours individual + 40 hours group supervision</li>
                <li>• Or alternative combination of supervised experience</li>
                <li>• Supervision by licensed mental health professional</li>
                <li>• Specific supervisor qualifications per ICMFTRC rules</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <div className="flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 mb-2">Final Reminder</h3>
              <p className="text-red-800 text-sm">
                This tool is provided for organizational and tracking purposes only. It is not a
                substitute for consulting official state requirements or professional guidance. Before
                submitting any supervision documentation to a licensing board, always:
              </p>
              <ul className="list-disc list-inside text-red-800 text-sm mt-3 space-y-1">
                <li>
                  Verify current requirements with the{' '}
                  <strong>North Carolina Board of Licensed Professional Counselors</strong> (NCBLPC)
                  or <strong>Indiana Counseling and Marriage and Family Therapy Regulatory Commission
                  </strong> (ICMFTRC)
                </li>
                <li>Confirm your supervisor meets all state requirements</li>
                <li>
                  Ensure your supervision format and content comply with current regulations
                </li>
                <li>
                  Review your state's specific forms and documentation requirements for submission
                </li>
                <li>Consult with your supervisor about proper record-keeping and documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm mb-3">
            Clinical Supervision Tracker - Professional Development Tool
          </p>
          <p className="text-xs text-slate-500">
            This tool is provided as-is for informational purposes. Always verify requirements with
            your state licensing board.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SupervisionTracker;
