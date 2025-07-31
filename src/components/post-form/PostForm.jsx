
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { markdownToHtml, isMarkdown } from "../../utils/contentRenderer";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // ✅ Slug generator
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  // ✅ Auto-generate slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // ✅ Submit handler
  const submit = async (data) => {
    if (!userData || !userData.$id) {
      console.error("❌ User not logged in. Cannot create post.");
      return;
    }

    let fileId = post?.featuredimage || ""; // keep old image by default

    // If new image is selected
    if (data.image && data.image.length > 0) {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (!file || !file.$id) {
        console.error("❌ File upload failed");
        return;
      }
      fileId = file.$id.trim();

      // Delete old image if editing
      if (post?.featuredimage) {
        await appwriteService.deleteFile(post.featuredimage);
      }
    }

    // Process content - convert Markdown to HTML if needed
    let processedContent = data.content || "";
    if (isMarkdown(processedContent)) {
      processedContent = markdownToHtml(processedContent);
    }

    // Update or Create post
    if (post) {
      const dbPost = await appwriteService.updatePost(post.$id, {
        title: data.title,
        content: processedContent,
        featuredimage: fileId,
        status: data.status,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const payload = {
        title: data.title,
        slug: data.slug,
        content: processedContent,
        status: data.status,
        featuredimage: fileId,
        userid: userData.$id,
      };
      const dbPost = await appwriteService.createPost(payload);
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6">
      {/* Main Content Section */}
      <div className="w-full lg:w-2/3">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-1/3">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && post.featuredimage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg max-h-[200px] object-contain w-full"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
